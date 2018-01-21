<template name="play">
  <div id="play" class="container">
    <div class="">
      <transition :key="swipe" :name="swipe">
        <div class="user-card" :key="index" v-if="images[index]">
            <div class="image_area">
              <img class="user-card__picture mx-auto" :src="images[index].pic" ></img>
            </div>
          <div class="user-card__name">
            <b-button variant="danger" style="float:left" @click="swipeLeft" v-shortkey="['arrowleft']" @shortkey="swipeLeft"> Fail </b-button>
            <span class="align-middle">Fail or Pass</span>
            <b-button variant="success" style="float:right" @click="swipeRight" v-shortkey="['arrowright']" @shortkey="swipeRight"> Pass </b-button>
          </div>
        </div>
        <!--<b-card :img-src="images[index].pic"
                img-alt="Card image"
                img-top
                style="position: absolute"
                class="mx-auto"
                :key="index" v-if="images[index]">
          <p class="card-text">
            <b-button variant="danger" style="float:left" @click="swipeLeft"> Fail </b-button>
            <b-button variant="success" style="float:right" @click="swipeRight"> Pass </b-button>
          </p>
        </b-card>-->

      </transition>
    </div>

  </div>
</template>

<style>
  /*https://github.com/pudymody/tinderSwipe/blob/gh-pages/style.css*/
  .user-card {
      max-width: 500px;
      height: fit-content;
      width: 100%;
      border: 1px solid #ccc;
      padding: 8px;
      box-shadow: 0px 2px 5px 0px #ccc;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto
  }

  .user-card__picture {
      width: 100%;
      display: block;
  }

  .image_area {
    background: black;
  }

  .user-card__name {
      margin-bottom: 0;
      margin-top: 8px;
  }

  .swipe-left {
      -webkit-animation: swipe-left 1s forwards;
              animation: swipe-left 1s forwards;
  }

  .swipe-right {
      -webkit-animation: swipe-right 1s forwards;
              animation: swipe-right 1s forwards;
  }

  @-webkit-keyframes swipe-left {
      to {
          -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
                  transform: rotate(-13deg) translate3d(-100%, 0, 0);
          opacity: 0;
      }
  }

  @keyframes swipe-left {
      to {
          -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
                  transform: rotate(-13deg) translate3d(-100%, 0, 0);
          opacity: 0;
      }
  }

  @-webkit-keyframes swipe-right {
      to {
          -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
                  transform: rotate(13deg) translate3d(100%, 0, 0);
          opacity: 0;
      }
  }

  @keyframes swipe-right {
      to {
          -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
                  transform: rotate(13deg) translate3d(100%, 0, 0);
          opacity: 0;
      }
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .swipe-right-enter-active {
    transition: all .3s ease;
  }

  .swipe-right-enter-to {
    transition: all .3s ease;
  }

  .swipe-right-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .swipe-right-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    -webkit-transform: rotate(13deg) translate3d(100%, 0, 0);
            transform: rotate(13deg) translate3d(100%, 0, 0);
    opacity: 0;
  }
  .swipe-left-enter-active {
    transition: all .3s ease;
  }
  .swipe-left-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .swipe-left-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    -webkit-transform: rotate(-13deg) translate3d(-100%, 0, 0);
            transform: rotate(-13deg) translate3d(-100%, 0, 0);
    opacity: 0;
  }
</style>

<script>
  import Vue from 'vue';
  import { db } from '../firebaseConfig';

  Vue.use(require('vue-shortkey'));

  export default {
    name: 'play',
    firebase: {
      images: db.ref('images'),
    },
    data() {
      return {
        images: [],
        index: 0,
        swipe: null,
      };
    },
    computed: {
      currentImg() {
        return this.images[0];
      },
    },
    methods: {
      swipeLeft() {
        this.images[this.index].pass = 0;
        this.setSwipe('swipe-left');
        this.setIndex();
      },
      swipeRight() {
        this.images[this.index].pass = 0;
        this.setSwipe('swipe-right');
        this.setIndex();
      },
      setSwipe(sw) {
        console.log('setting swipe', sw);
        this.swipe = sw;
      },
      setIndex() {
        if (this.index === this.images.length - 1) {
          this.index = 0;
        } else {
          this.index += 1;
        }
      },
    },
  };
</script>
