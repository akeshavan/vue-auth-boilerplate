<template>
  <div class="home container">
    <h1>{{msg}}</h1>

    Welcome! This app has <strong>vue-router</strong>, which means that when you
    navigate to a new page, the site is not reloaded. Instead, the data model
    is updated and the view changes. Authentication is through GitHub (click
    the login button at the top right to log in). The "bitcoin" and "ethereum"
    links are dynamic routes. When you navigate there, the URL tells the page
    how to render.

  </div>


</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to your Vue app boilerplate',
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

</style>
