<template>
  <div id="app">
    <NavBar @showAuthModal="showAuthModal = true"/>
    <AuthModal v-if="showAuthModal" @hideAuthModal="showAuthModal = false"/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AuthModal from "@/components/AuthModal.vue";
import eventBus from "@/main";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBcZZ5s3-o1QtZ2u-vaD7HNZss90ZiF65c",
  authDomain: "rpi-webrtc.firebaseapp.com",
  databaseURL: "https://rpi-webrtc.firebaseio.com",
  projectId: "rpi-webrtc",
  storageBucket: "rpi-webrtc.appspot.com",
  messagingSenderId: "104152138266"
};
firebase.initializeApp(config);

export default {
  name: "app",
  data() {
    return {
      authStatus: false,
      showAuthModal: false,
      email: "",
      displayName: ""
    };
  },
  created() {
    eventBus.$on("changeAuthStatus", () => {
      this.authStatus = !this.authStatus;
    });
  },
  components: {
    AuthModal,
    NavBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b5cce2;
  background-color: #0f0e11;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 50px repeat(11, 200px);
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
