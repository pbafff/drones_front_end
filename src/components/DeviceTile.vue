<template>
  <div class="device-tile" @click="$router.push('/flightdeck/' + name)">
    <img class="device-img" src="../../public/IRIS_gopro.png">
    <p id="name">{{name}}</p>
    <p id="state">{{state}}</p>
  </div>
</template>

<script>
export default {
  name: "devicetile",
  props: {
      name: String,
      state: {
          type: String,
          default: 'Unknown'
      },
  }
};
</script>

<style>
.device-tile {
  width: 250px;
  height: 250px;
  border: 1px;
  border-color: #3c3a41;
  background-color: #19171c;
  border-style: solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;

  cursor: pointer;
}
.device-img {
  width: 80%;
  
}
</style>
