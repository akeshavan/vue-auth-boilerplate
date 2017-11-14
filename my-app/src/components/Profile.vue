<template>
  <div id="profile">
    <!-- Only show stuff is the user is authenticated -->
    <div v-if="isAuthenticated">
      <!-- userInfo is a prop that was passed in from App -->
      <h1>{{userInfo.username}}</h1>
      <p>
        You are logged in. Try logging out to see what happens to this page.
      </p>

    </div>

    <div v-else>
      <h1>Error!</h1>
      <p>
        Please log in to see your profile
      </p>
    </div>

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
  props: ['isAuthenticated', 'userInfo'],
};
</script>
