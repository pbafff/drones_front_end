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
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "flightdeck",
  components: {
    VideoPlayer,
  },
  props: {
    name: null
  },
  mounted() {
    
  },
  methods: {
    
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
