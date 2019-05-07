<template>
  <div>
    <DeviceTile
      v-for="device in devices"
      :key="device.id"
      :name="device.name"
      :state="device.state"
    ></DeviceTile>
  </div>
</template>

<script>
import DeviceTile from "@/components/DeviceTile.vue";

export default {
  name: "hangar",
  data() {
    return {
      devices: [{ id: 1234, name: "iris" }]
    };
  },
  components: {
    DeviceTile
  }
};
</script>

<style>
</style>
