<template>
  <div id="contact">
    <h1> Contact Us </h1>

    Is something broken, wrong, or really right?

    You should email the creators!<br>
    <a href="mailto:klb0036@gmail.com?Subject=metaCurious" target="_top">
      Ok, I will!
    </a>

    <input type="text" v-model="pmid">
    <router-link v-bind:to="'/coins/'+pmid" >Go!</router-link>

    </input>
  </div>

</template>

<style>
</style>

<script>
export default {
  name: 'about',
  data() {
    return {
      count: 1,
      pmid: null,
    };
  },
  methods: {
    increase: function(){
      this.count += 1
    }
  }
};
</script>
