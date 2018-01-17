<template>
  <article 
    class="work-card" :class="{'reveal' : reveal}"
    :style="`background-color:`"
    v-scroll-reveal="{duration: 1000, scale: 1, distance: 0, opacity: 1, viewOffset: { bottom: 50 }}"
    @beforeReveal="wipe"
    :data-wio-id="post.id">
    <!-- Wipe transition -->
    <div class="wipe" :style="`background-color: ${entry.primary_color}`"></div>
    
    <nuxt-link :to="`/work/${post.uid}`">
      <!-- quick info overlay : reveal on hover -->
      <div class="work-quick-info is-overlay columns">
        <div class="work-quick-title column">
          <h2 class="quick-title">
            {{entry.title[0].text}}
            <span>{{entry.description[0].text}}</span>
          </h2>
        </div>

        <div class="work-quick-involvement column">
          <h4><strong class="has-text-white">Involvement</strong></h4>
          <div class="quick-involvement rich-text" v-html="toNewLines(entry.involvement)"></div>
        </div>
      </div>

      <div class="image-loader" ref="imageLoader">
        <div class="slice-wrap" v-for="(slice, i) in 1" :key="i">
          <div class="image-slice" v-lazy:background-image="entry.feature_image.url"></div>
        </div>
      </div>
      <img v-lazy="entry.feature_image.url" style="visibility: hidden; opacity: 0;">
    </nuxt-link>
  </article>
</template>

<script>
import {mapGetters} from 'vuex'
// import {TimelineMax} from 'gsap' // Need for slice stagger
export default {
  props: ['post'],
  data () {
    return {
      reveal: false,
      entry: this.post.data
    }
  },
  // watch: {
  //   reveal () {
  //     this.animateSlices()
  //   }
  // },
  computed: {
    ...mapGetters(['breakpoint'])
  },
  methods: {
    toNewLines (str) {
      if (str) {
        return str.split('\n').join('<br>')
      }
    },
    wipe () {
      this.reveal = true
    }
    // animateSlices () {
    //   let loader = this.$refs.imageLoader
    //   let slices = [...loader.childNodes]
    //   let imgs = slices.map((slice, i) => {
    //     return slice.querySelector('.image-slice')
    //   })
    //   let tl = new TimelineMax()
    //   let staggerSlices = () => {
    //     tl.staggerFromTo(imgs, 0.5, {
    //       y: 200
    //     }, {
    //       y: 0
    //     }, 0.25)
    //   }

    // window.requestAnimationFrame(staggerSlices)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.work-card {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-top: 41.75%;
  @include mobile() {
    padding-top: 56.25%;
  }
  .wipe {
    top: 0;
    left: 0;
    height: 100%;
    z-index: 20;
    @include overlay();
    background: gray;
    transition: all 1s cubic-bezier(.97,0,.51,1);
  }
  a {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: block;
    overflow: hidden;
    .work-quick-info {
      z-index: 10;
      height: 100%;
      margin: 0;
      padding: 6rem;
      align-items: center;
      justify-content: center;

      transition: all 0.5s ease;
      @include mobile() {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .column {
          flex: 0 1 auto;
        }
      }
      @include touch() {
        padding: 3rem;
      }
      h2.quick-title {
        font-size: 1.5rem;
        color: white;
        transition: all 0.5s ease;
        @include tablet() {
          transform: translate(50px, 0);
        }
        span {
          font-size: 1.5rem;
          display: inline-block;
          // margin-left: .5rem;
          font-weight: $lightW;
          color: rgba(white, 0.8);
          @include autoAlpha(0);
          transform: translate(-100px, 0);
          transition: all 0.5s 0.125s ease;
          @include mobile() {
            display: block;
            margin-left: 0;
          } 
        }
      }
      .work-quick-involvement {
        @include mobile() {
          display: none
        }
        h4 {
          @include autoAlpha(0);
          transition: all 0.5s ease;
          transform: translate(300px, 0);
        }
        .quick-involvement {
          color: $grey-light!important;
          white-space: pre-wrap; 
          column-count: 2;
          @include autoAlpha(0);
          transform: translate(300px, 0);
          transition: all 0.5s 0.125s ease;
        }
      }
    }
    img {
      display: block;
      transition: all 15s ease;
      @include mobile() {
        object-fit: cover;
        height: 100%;
        width: auto;
        position: absolute;
      }
    }
  }
  &:hover {
    .work-quick-info {
      background: rgba(black, 0.7);
      .quick-title {
        transform: translate(0,0);
        span {
          @include autoAlpha(1);
          transform: translate(0, 0)
        }
      }
      .work-quick-involvement {
        h4, .quick-involvement {
          @include autoAlpha(1);
          transform: translate(0,0);
        }
      }
    }
    img {
      transform: scale(1.3);
    }
  }
  &.reveal {
    .wipe {
      top: -101%;
    }
  }

  .image-loader {
    display: flex;
    @include overlay();
    overflow: hidden;
    .slice-wrap {
      flex: 1 0 auto;
      overflow: hidden;
      position: relative;
      .image-slice {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%; // multiply by 100 for number of slices
        background-size: cover;
        background-position: center;
        transition: opacity .5s ease;
        &[lazy=loading] {
          opacity: 0;
        }
        // &[lazy=error] {
        //   /*your style here*/
        // }
        &[lazy=loaded] {
          opacity: 1
        }
      }
      &:nth-child(1) .image-slice {
        left: 0;
      }
      &:nth-child(2) .image-slice {
        left: -100%;
      }
      &:nth-child(3) .image-slice {
        left: -200%;
      }
    }
  }
}
</style>
