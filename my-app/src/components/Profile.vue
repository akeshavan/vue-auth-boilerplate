<template>
  <div id="profile">
    <!-- Only show stuff is the user is authenticated -->
    <b-container fluid>
      <!-- userInfo is a prop that was passed in from App -->
      <h1>{{userInfo.displayName}}</h1>
      <p>
        You are logged in. Try logging out to see what happens to this page.
      </p>
    </b-container>

  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'profile',
  data() {
    return {

    };
  },
  // the parent component feeds these vars to this component
  props: ['userInfo'],
};
</script>
