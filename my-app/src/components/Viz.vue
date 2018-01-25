<template>
  <div class="viz">
    <h1> Data Visualization </h1>
    <div class="container barplot">
      <div>
        <p class="lead"> Realtime updating charts describing the data collected on braindr. </p>
      </div>
       <hr>
      <h2> Number of votes per image </h2>
      <p class="lead">
        We want every image to have been rated at least 5 times
      </p>
      <p>
        Click on a bar of the histogram to look at the pass/fail distribution of votes
      </p>

      <div v-for="(bin, index) in makeHist" class="line">
        <span class="label"> {{index}} </span>
        <div class="bar" :style="bin" @click="plotDist(bin)">
          {{bin.text}}
        </div>
      </div>
      <hr>
      <h2> Average vote distribution </h2>
      <p class="lead">
        Some images clearly pass or fail QC, but some are in between.
      </p>



    </div>
  </div>
</template>

<style>
.bar {
  background-color: steelblue;
  color: white;
  margin: 5px;
  text-align: right;
}

.bar:hover{
  background-color: #ecb058;
  cursor: pointer;
}

.line {
  display: flex;
}

.barplot {

}
</style>

<script>
import _ from 'lodash';
const lm = require('lomath');
import { db } from '../firebaseConfig';

export default {
  name: 'viz',
  firebase: {
    imageCount: {
      source: db.ref('imageCount').orderByChild('num_votes'),
      readyCallback() {
        console.log(this.imageCount);
      },
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    makeHist() {
      if (this.ready){
        const data = _.groupBy(this.imageCount, 'num_votes');
        const w = document.getElementsByClassName('barplot')[0].clientWidth || 100;
        const vals = [];
        _.mapValues(data, (v) => {
          vals.push(v.length);
        });
        const m = _.max(vals) * 1.1;
        const bins =   _.mapValues(data, (v) => {
          return { width: v.length/m * w +'px', text: v.length };
        });
        return bins;
      }
    },
  },
  methods: {
    plotDist(bin) {
      if (!bin) {
        // plot the full distribution


      } else {

      }
    },
  },
  mounted(){
    this.ready = true;
  }
};
</script>
