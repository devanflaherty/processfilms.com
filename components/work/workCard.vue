<template>
  <article class="column is-marginless is-paddingless" :class="{'is-6': $route.name === 'index'}">
    <div 
      class="work-card" 
      :class="{'hover' : hover, 'is-full': $route.name !== 'index'}"
      :style="`background-color:`"
      v-scroll-reveal="{duration: 1000, scale: 1, distance: '40px', viewOffset: { bottom: 50 }, delay: revealDelay}"
      :data-wio-id="post.id">
      
      <nuxt-link :to="`/work/${post.uid}`">
        <div class="work-quick-info is-overlay columns" :class="alignment">
          <div class="work-quick-title column">
            <h2 class="quick-title">
              {{$prismic.asText(entry.title)}}
              <!-- <span>{{entry.description[0].text}}</span> -->
            </h2>
          </div>
        </div>

        <div class="image-loader" ref="imageLoader">
          <div class="slice-wrap" v-for="(slice, i) in 1" :key="i">
            <div class="image-slice" v-lazy:background-image="entry.feature_image.url"></div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import {mapGetters} from 'vuex'
// import {TimelineMax} from 'gsap' // Need for slice stagger
export default {
  props: ['post', 'index'],
  data () {
    return {
      hover: false,
      entry: this.post.data
    }
  },
  computed: {
    ...mapGetters(['breakpoint']),
    alignment () {
      return {
        'has-text-right': this.isOdd(this.index) === 0,
        'has-text-left': this.isOdd(this.index) === 1
      }
    },
    revealDelay () {
      if (this.isOdd(this.index) === 0) {
        return 0
      } else {
        return 250
      }
    }
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
  &:hover:not(.hover) {
    opacity: 0.5;
  }
  &.is-full {
    .work-quick-info {
      padding: 3rem;
    }
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
      padding: 2rem;
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
      h2.quick-title {
        font-size: 1.5rem;
        color: white;
        transition: all 0.5s ease;
        span {
          font-size: 1.5rem;
          display: inline-block;
          font-weight: $lightW;
          color: rgba(white, 0.8);
          @include autoAlpha(0);
          transition: all 0.5s 0.125s ease;
          @include mobile() {
            display: block;
            margin-left: 0;
          } 
        }
      }
    }
  }
  &:hover {
    .work-quick-info {
      // background: rgba(black, 0.7);
      h2.quick-title {
        transform: translate(50px, 0);
        span {
          @include autoAlpha(1);
          transform: translate(-100px, 0);
        }
      }
      &.has-text-right {
        h2.quick-title {
          transform: translate(-50px, 0);
        }
        span {
          transform: translate(100px, 0);
        }
      }
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
