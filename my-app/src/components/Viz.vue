<template>
  <div class="viz">
    <h1> Data Visualization </h1>
    <div class="container barplot">
      <div>
        <p class="lead"> Realtime updating charts describing the data collected on braindr. </p>
      </div>

      <h2> Number of votes per image </h2>

      <div v-for="(bin, index) in makeHist" class="line">
        <span class="label"> {{index}} </span>
        <div class="bar" :style="bin">
          {{bin.text}}
        </div>
      </div>
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

.line {
  display: flex;
}

.barplot {

}
</style>

<script>
import _ from 'lodash';
import { db } from '../firebaseConfig';

export default {
  name: 'viz',
  firebase: {
    imageCount: {
      source: db.ref('imageCount').orderByChild('num_votes'),
      readyCallback() {

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

        console.log(bins, m);
        return bins;
      }
    },
  },
  methods: {

  },
  mounted(){
    this.ready = true;
  }
};
</script>
