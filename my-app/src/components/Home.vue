<template>
  <div class="home container">
    <div class="jumbotron landing">
      <h1>{{msg}}</h1>
      <p class="lead buttons">
        The Tinder app for brain images
      </p>
      <p class="buttons">
        <router-link class="btn btn-primary white" to="/play"> Play Now </router-link>
      </p>
    </div>

  </div>


</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Neurotinder',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home {
  text-align: left;
}

.home h1 {
  text-align: center;
}

.buttons {
  text-align: center;
}

.landing {
  background-color: white;
}

.white {
  color: white;
}

</style>
