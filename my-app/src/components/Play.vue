<template name="play">
  <div id="play" class="container">
    <div class="">

      <transition :key="swipe" :name="swipe">
        <div class="user-card" :key="currentIndex" v-if="currentImage">
            <div class="image_area">
              <img class="user-card__picture mx-auto" :src="currentImage.pic"
              v-hammer:swipe.horizontal="onSwipe"
              ></img>
            </div>
          <div class="user-card__name">
            <b-button variant="danger"
              style="float:left"
              @click="swipeLeft"
              v-shortkey="['arrowleft']"
              @shortkey="swipeLeft"
              v-hammer:swipe.left="swipeLeft"
            > Fail </b-button>
            <span class="align-middle">Fail or Pass</span>
            <b-button variant="success"
              style="float:right"
              @click="swipeRight"
              v-shortkey="['arrowright']"
              @shortkey="swipeRight"
            > Pass </b-button>
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

      <b-alert :show="dismissCountDown"
         :variant="score.variant"
         class="toast"
         @dismissed="dismissCountdown=0"
         @dismiss-count-down="countDownChanged">
         {{score.message}}
      </b-alert>

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

  .toast {
    width: auto;
    max-width: 300px;
    top: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
  }

</style>

<script>
  import Vue from 'vue';
  import _ from 'lodash';
  import { VueHammer } from 'vue2-hammer';
  import { db } from '../firebaseConfig';

  Vue.use(VueHammer);

  Vue.use(require('vue-shortkey'));

function randomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}


  export default {
    name: 'play',
    firebase: {
      // images: db.ref('images'),
      imageCount: {
        source: db.ref('imageCount'),
        readyCallback() {
          console.log('is ready', this.imageCount);
          this.setCurrentImage();
        },
      },
    },
    props: ['userInfo', 'userData'],
    data() {
      return {
        // images: [],
        currentImage: {},
        currentIndex: null,
        imageCount: [],
        swipe: null,
        startTime: null,
        dismissSecs: 1,
        dismissCountDown: 0,
        score: {
          variant: 'warning',
          message: '',
        },
      };
    },
    computed: {
      currentCount() {
        return this.imageCount[this.currentIndex];
      },
    },
    mounted() {
      this.startTime = new Date();
    },
    components: { VueHammer },
    methods: {
      setCurrentImage() {
        const N = this.imageCount.length;
        this.currentIndex = randomInt(0, N - 1);
        const key = this.currentCount['.key'];
        console.log('key is', key);
        db.ref('images').child(key).once('value').then((snap) => {
          this.currentImage = snap.val();
        });
      },
      swipeLeft() {
        console.log(this.currentCount['.key']);
        this.getScore(0).then(() => {
          this.showAlert();
          this.sendVote(0).then(() => {
            this.setSwipe('swipe-left');
            this.setCurrentImage();
          });
        });
      },
      sendVote(vote) {
        db.ref('votes').push({
          username: this.userInfo.displayName,
          time: new Date() - this.startTime,
          vote,
          image_id: this.currentCount['.key'],
        });

        return this.$firebaseRefs.imageCount
          .child(this.currentCount['.key'])
          .child('num_votes')
          .set(this.currentCount.num_votes + 1);
      },
      computeScore(data, vote) {
        let voteScore = 0;
        let size = 0;

        _.mapValues(data, (v) => {
          voteScore += v.vote;
          size += 1;
          return v.vote;
        });

        const aveVote = voteScore / size;
        const newAve = (voteScore + vote) / (size + 1);

        if (size <= 5) {
          // not enough votes to say.
          this.score.message = 'too few votes, you get a point!';
          this.score.variant = 'success';
          return { score: 1, ave: newAve };
        }

        if (aveVote <= 0.3 || aveVote >= 0.7) {
          // the group feels strongly. Do you agree w/ them?
          if (aveVote <= 0.3 && !vote) {
            this.score.message = 'you agree w/ group: 0';
            this.score.variant = 'success';
            return { score: 1, ave: newAve };
          } else if (aveVote >= 0.7 && vote) {
            this.score.message = 'you agree w/ group: 1';
            this.score.variant = 'success';
            return { score: 1, ave: newAve };
          }

          // you disagree w/ the majority. You are penalized
          this.score.message = 'you disagree w/ the majority. You are penalized';
          this.score.variant = 'danger';
          return { score: 0, ave: newAve };
        }

        this.score.message = 'group is undecided, you get a point';
        this.score.variant = 'success';
        return { score: 1, ave: newAve };
      },
      getScore(vote) {
        // get all scores for the images
        // then run computeScore to get the points

        return db.ref('votes')
          .orderByChild('image_id')
          .equalTo(this.currentCount['.key'])
          .once('value')
          .then((snap) => {
            const data = snap.val();
            console.log('snap data is', data);
            const score = this.computeScore(data, vote);
            db.ref('users').child(this.userInfo.displayName)
              .child('score').set(this.userData.score + score.score);

            this.$firebaseRefs.imageCount
                .child(this.currentCount['.key'])
                .child('ave_score')
                .set(score.ave);
          });
      },
      swipeRight() {
        this.getScore(1).then(() => {
          this.showAlert();
          this.sendVote(1).then(() => {
            this.setSwipe('swipe-right');
            this.setCurrentImage();
          });
        });
      },
      setSwipe(sw) {
        console.log('setting swipe', sw);
        this.swipe = sw;
      },
      onSwipe(evt) {
        if (evt.direction === 2) {
          this.swipeLeft();
        } else {
          this.swipeRight();
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs;
      },
    },
  };
</script>
