<template>
  <div id="app">
    <!-- The Navbar below stays constant throughout the app.
         We've set up links on the navbar to different "routes",
         like the "Home" page and "About" page.

         There is also a right-aligned link to Login with GitHub.
         When logged in, this shows the username with a dropdown menu
         to see the profile or logout.
    -->
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">my-app</b-navbar-brand>

      <!-- If the viewport is small, the navbar collapses.
          Everything in b-collapse is what gets collapsed.
      -->
      <b-collapse is-nav id="nav_collapse">

        <!--  Here are links to different routes  -->
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/coins/bitcoin">Bitcoin</b-nav-item>
          <b-nav-item to="/coins/ethereum">Ethereum</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- This part only displays if the user is authenticated -->
          <b-nav-item-dropdown right v-if="isAuthenticated">
            <template slot="button-content">
              <em>{{userInfo.username}}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- The login option shows if the user is not authenticated -->
          <b-nav-item v-else>
            <a @click="authenticate()">Login with GitHub</a>
          </b-nav-item>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <!-- The content is in the router view -->
    <div class="router">
      <router-view :isAuthenticated="isAuthenticated" :userInfo="userInfo"/>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import pathJoin from 'path.join';
import axios from 'axios';
import auth from './lib/auth';


Vue.use(BootstrapVue);

export default {
  name: 'app',
  data() {
    return {
      isAuthenticated: false,
      userInfo: {
        username: null,
      },
    };
  },
  methods: {

    authenticate() {
      const self = this;
      auth.login(() => {
        self.getUserInfo();
      });
    },

    getUserInfo() {
      const token = auth.getToken();
      const self = this;

      // TODO: CHANGE THIS TO YOUR SERVER
      // In this example, we are getting user info from github
      // If this fails, then our token is bad; we are NOT authenticated and
      // should be logged out

      axios.get(pathJoin('https://api.github.com', 'user'), {
        headers: {
          Authorization: `token ${token}`,
        },
      }).then((resp) => {
        self.isAuthenticated = true;

        // TODO: do stuff here, like setting user info variables
        self.userInfo.username = resp.data.login;
        self.userInfo.avatar = resp.data.avatar_url;
      }).catch(() => {
        self.logout();
      });
    },

    logout() {
      this.isAuthenticated = false;
      auth.logout();
    },
  },

  created() {
    this.getUserInfo();
  },
};
</script>

<style>
  /*
    You can style your component here. Since this is a top level componentm
    the styles follow into child components.
  */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .router {
    padding-top: 40px;
  }
</style>
