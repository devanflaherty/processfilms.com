<template>
  <article class="column is-marginless is-paddingless" :class="{'is-6': $route.name === 'index'}">
    <div 
      class="work-card" 
      :class="{'hover' : hover, 'is-full': $route.name !== 'index'}"
      :style="`background-color:`"
      v-scroll-reveal="{duration: 1000, scale: 1, distance: '40px', viewOffset: { bottom: 50 }, delay: revealDelay}"
      :data-wio-id="post.id">
      
      <nuxt-link :to="`/work/${post.uid}`">
        <div class="work-quick-info is-overlay" :class="alignment">
          <h2 class="quick-title">
            {{$prismic.asText(entry.title)}}
          </h2>
          <h3>
            {{entry.client}}
          </h3>
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
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      justify-content: center;
      h2 {
        position: relative;
        color: white;
        transition: all .66s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: inline-block;
        opacity: 0;
        transform: translate(-20px, 0);
        @include mobile () {
          font-size: 2rem;
        }
        @include tablet () {
          font-size: 1.5rem;
        }
        @include desktop () {
          font-size: 1.5rem;
        }
      }
    }
    h3 {
      display: block;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      @include mobile () {
        font-size: 1.33rem;
      }
      @include tablet () {
        font-size: .75rem;
      }
      @include desktop () {
        font-size: .75rem;
      }
    }
  }
  &:hover {
    .work-quick-info {
      background: rgba(black, 0.33);
      h2 {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
    .image-loader {
      transform: scale(1.075)
    }
  }

  .image-loader {
    display: flex;
    transition: all .33s ease;
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

@keyframes spanIn {
  0% {
    width: 0;
    left: 0;
    right: auto;
  }
  50% {
    width: 100%;
  }
  51% {
    right: 0;
    left: auto;
  }
  100% {
    width: 0;
  }
}
</style>
