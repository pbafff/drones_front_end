<template>
  <div id="home">
    <!-- youtube video -->
    <!-- <p>Contact me for live demostration</p> -->
    <router-link to="/hangar">Hangar</router-link>
  </div>
</template>

<script>

export default {
  name: "home",
  components: {
    
  }
};
</script>

<style>
#home {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 13;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 20px repeat(24, 1fr);
}
</style>
