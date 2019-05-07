<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button
                class="modal-default-button"
                style="border: none; background-color: inherit; color: #989697; cursor: pointer; font-size: 20px;"
                @click="$emit('hideAuthModal')"
              >✕</button>
            </slot>
          </div>
          <div class="modal-body">
            <input
              id="txtEmail"
              v-model="txtEmail"
              placeholder="Email"
              style="height: 50px; font-size: 20px; background-color: inherit; color: rgb(203, 206, 209); border: none; "
            >
            <input
              id="txtPassword"
              type="password"
              v-model="txtPassword"
              style="height: 50px; font-size: 20px; background-color: inherit; color: rgb(203, 206, 209); border: none; "
              placeholder="Password"
            >
            <input
              id="txtUsername"
              v-model="txtUsername"
              v-if="showSignUpForm"
              style="height: 50px; font-size: 20px; background-color: inherit; color: rgb(203, 206, 209); border: none; "
              placeholder="Username"
            >
            <p>{{ status }}</p>
            <a
              href="#"
              style="color: rgb(203, 206, 209); text-decoration: none;"
              @click="showSignUpForm = !showSignUpForm; showSignUpForm ? logInOrSignUp = 'Sign Up' : logInOrSignUp = 'Log In'; showSignUpForm ? createOrLogIn = 'Log in instead' : createOrLogIn = 'Create account'"
            >{{createOrLogIn}}</a>
            <button id="btnLogin" @click="login">{{logInOrSignUp}}</button>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
export default {
  name: "authmodal",
  data() {
    return {
      txtEmail: "",
      txtPassword: "",
      txtUsername: "",
      status: "",
      createOrLogIn: "Create account",
      showSignUpForm: false,
      logInOrSignUp: "Log In"
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.txtEmail, this.txtPassword)
        .then(
          userCredential => {
            this.status = "Welcome back, " + userCredential.user.displayName;
            setTimeout(() => this.$emit("hideAuthModal"), 625);
          },
          err => {
            this.status = "Woops! " + err.message;
          }
        );
    },
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.txtEmail, this.txtPassword)
        .then(
          user => {
            this.status = "Account created";
            user.set({ displayName: this.txtUsername });
          },
          err => {
            alert("Woops! " + err.message);
          }
        )
        .then(() => {
          const user = firebase.auth().currentUser;
          this.status = "Welcome, " + user.displayName;
          setTimeout(() => this.$emit("hideAuthModal"), 625);
        });
    }
  }
};
</script>

<style>
.modal-container {
  background-color: rgb(44, 44, 44);
}
#btnLogin {
  border: none;
  background-color: rgb(86, 128, 128);
  font-size: 15px;
  cursor: pointer;
  color: rgb(203, 206, 209);
  padding: 5px;
  border-radius: 5px;
}
#btnSignUp {
  border: none;
  margin-left: 15px;
  background-color: rgb(86, 128, 128);
  font-size: 15px;
  cursor: pointer;
  color: rgb(203, 206, 209);
  padding: 5px;
  border-radius: 5px;
}
.hide {
  display: none;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgb(95, 87, 87);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
}
.modal-body {
  margin: 20px 0;
  color: rgb(199, 197, 197);
}
.modal-default-button {
  float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>