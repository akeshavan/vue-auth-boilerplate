<template>
  <div id="profile">
    <!-- Only show stuff is the user is authenticated -->
    <b-container fluid>
      <!-- userInfo is a prop that was passed in from App -->
      <h1>
        <b-img rounded="circle" width="75"
          height="75" blank-color="#777"
          alt="img" class="m-1"
          :src="currentLevel.img"
          />
        {{userInfo.displayName}}
      </h1>

      <p>
        You have {{userData.score}} points!
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
  props: ['userInfo', 'userData', 'levels', 'currentLevel'],
};
</script>
