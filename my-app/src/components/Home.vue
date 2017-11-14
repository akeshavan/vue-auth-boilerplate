<template>
  <div class="home container">
    <h1>{{msg}}</h1>

    Welcome! This app has <strong>vue-router</strong>, which means that when you
    navigate to a new page, the site is not reloaded. Instead, the data model
    is updated and the view changes. <strong>Authentication</strong> is through GitHub (click
    the login button at the top right to log in). The "bitcoin" and "ethereum"
    links are <strong>dynamic routes</strong>. When you navigate there, the URL has a variable that tells the page
    how to render (i.e. which coin price to render).

    Check out the Profile page after logging in. It only renders correctly if the user is logged in.
    

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
