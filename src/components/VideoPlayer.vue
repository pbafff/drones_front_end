<template>
  <video
    class="dialog-video__align-center"
    id="remoteVideo"
    autoplay
    playsinline
    muted
    border="1"
    alt
  ></video>
</template>

<script>
export default {
  name: "videoplayer"
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#remoteVideo {
  background-color: rgb(48, 54, 54);
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 2;
  grid-column-end: 19;
  width: 100%;
  height: auto;
}
</style>
