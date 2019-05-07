<template>
  <div id="fd">
    <button @click="$router.push('/hangar')">Hangar</button>
    <button @click="getObject">get object</button>
    <VideoPlayer/>
    <p>{{name}}</p>
    <a
      v-if="!name"
      href="#"
      style="text-decoration: none; color: inherit"
      @click="$router.push('/hangar')"
    >Go to your hangar to select a drone</a>
    <img src="@/assets/Map_pin_icon.png" draggable="true" @dragstart="dragstartHandler($event)" style="height: 25px; cursor: pointer">
    <div id="map" style="width: 350px; height: 350px" @drop="addWaypoint($event)" @dragover="dragoverHandler($event)"></div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import * as ROSLIB from "roslib";
import * as ROS3D from 'ros3d';
import * as THREE from 'three';

let ros;
let service;
let viewer;
let container;
let offsetX = 0;
let offsetY = 0;
let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

export default {
  name: "flightdeck",
  components: {
    VideoPlayer,
  },
  props: {
    name: null
  },
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap() {
      container = document.querySelector('#map');
      viewWidth = container.offsetWidth;
      viewHeight = container.offsetHeight;

      ros = new ROSLIB.Ros({
        url: "ws://localhost:9090"
      });

      viewer = new ROS3D.Viewer({
        divID: 'map',
        width: 350,
        height: 350,
        antialias: true,
        background: '#31415b'
      });

      new ROS3D.OrbitControls({
        scene: viewer.scene,
        camera: viewer.camera
      });

      const tfClientPcl = new ROSLIB.TFClient({
        ros: ros,
        angularThres : 0.01,
        transThres : 0.01,
        rate : 10.0,
        fixedFrame: '/map'
      });

      new ROS3D.PointCloud2({
        ros: ros,
        topic: '/orb_slam2_mono/map_points',
        tfClient: tfClientPcl,
        rootObject: viewer.scene,
        material: {size: .003},
      });

      const axis = new ROS3D.Axes();
      const axisNode = new ROS3D.SceneNode({
        tfClient: tfClientPcl,
        frameID: '/camera_link',
        object: axis,
      });

      viewer.scene.add(axisNode);
    
      // const tfClient = new ROSLIB.TFClient({
      //   ros: ros,
      //   angularThres : 0.01,
      //   transThres : 0.01,
      //   rate : 10.0,
      //   fixedFrame: '/map'
      // });

      new ROS3D.InteractiveMarkerClient({
        ros: ros,
        tfClient: tfClientPcl,
        topic: '/waypoints',
        camera: viewer.camera,
        rootObject: viewer.selectableObjects
      });

      service = new ROSLIB.Service({
        ros: ros,
        name: 'create_waypoint',
        serviceType: 'waypoints/CreateWaypointMarker'
      });

    },
    addWaypoint(event) {
      this.calcOffsets();

      const mouse = new THREE.Vector3();
      mouse.x = ( event.clientX - offsetX ) / viewWidth * 2 - 1;
      mouse.y = - ( event.clientY - offsetY ) / viewHeight * 2 + 1;
      mouse.z = 0.5;

      mouse.unproject(viewer.camera);
      mouse.sub( viewer.camera.position );
      mouse.normalize();

      const rayCaster = new THREE.Raycaster(viewer.camera.position, mouse);
      this.drawRayLine(rayCaster);
    },
    drawRayLine(rayCaster) {
      const scale = viewWidth * 0.5;
      const rayDir = new THREE.Vector3(rayCaster.ray.direction.x*scale, rayCaster.ray.direction.y*scale, rayCaster.ray.direction.z*scale);
      const rayVector = new THREE.Vector3(viewer.camera.position.x + rayDir.x, viewer.camera.position.y + rayDir.y, viewer.camera.position.z + rayDir.z);
      this.drawWaypointLine(viewer.camera.position, rayVector);
    },
    drawWaypointLine(pointA, pointB) {
      const factor = 50;
      const x = this.getFactorPos(pointB.x - pointA.x, factor, 1);
      const y = this.getFactorPos(pointB.y - pointA.y, factor, 1);
      const z = this.getFactorPos(pointB.z - pointA.z, factor, 1);

      const request = new ROSLIB.ServiceRequest({x: pointA.x + x, y: pointA.y + y, z: pointA.z + z});
      service.callService(request, (res) => console.info(res), (err) => console.warn(err));
    },
    getFactorPos( val, factor, step ) {
      return step / factor * val;            
    },
    calcOffsets() {
      const rect = container.getBoundingClientRect();                                
      offsetX = rect.left;
      offsetY = rect.top;
    },
    dragstartHandler(event) {
      return;
    },
    dragoverHandler(event) {
      event.preventDefault();
    },
    getObject() {
      const obj = viewer.scene.getObjectByName('simple_6dof_MOVE_ROTATE_3D-1');
      console.log(obj)
    }
  }
};
</script>

<style> 
#fd {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 13;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 20px repeat(24, 1fr);
}
</style>
