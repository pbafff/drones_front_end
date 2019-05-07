<template>
  <div id="nav">
    <button @click="logInOrOut === 'Log In' ? $emit('showAuthModal') : logout()">{{logInOrOut}}</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "navbar",
  data() {
    return {
      logInOrOut: "Log In"
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.logInOrOut = "Log Out";
      }
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.logInOrOut = "Log In";
    }
  }
};
</script>

<style>
</style>
