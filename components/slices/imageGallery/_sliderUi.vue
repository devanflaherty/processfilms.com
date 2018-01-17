<template>
  <div class="slide-ui">
    <div class="container">
      <!-- <div class="swiper-button-prev swiper-arrow"><i class="fa fa-angle-left"></i></div>
      <div class="swiper-button-next swiper-arrow"><i class="fa fa-angle-right"></i></div> -->

      <div ref="pagination" class="swiper-custom-pagination" :class="`slide-ui-${slideUi}`">
        <a class="pagination-bullet"
          :class="{'active': activeSlide == index}"
          @click="slideToEmit(index)" 
          @mouseenter="pauseSliderEmit()"
          @mouseleave="playSliderEmit()"
          :href="`#slide${index}`" 
          v-for="(tab, index) in tabs" 
          :key="index">
            <span class="pagination-slide-title">
              {{tab.slide_title}}&nbsp;
            </span>
            <span>
              {{tab.slide_caption}}&nbsp;
            </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import heroTransitions from './_transitions'

export default {
  props: ['tabs', 'slideUi', 'activeSlide'],
  mixins: [heroTransitions],
  methods: {
    slideToEmit (index) {
      // var i = index + 1
      this.$emit('slideToEmit', index)
    },
    pauseSliderEmit () {
      this.$emit('pauseSliderEmit')
    },
    playSliderEmit () {
      this.$emit('playSliderEmit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.slide-ui {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: 20;
  .container {
    height: 100%;
    @include touch() {
      margin: 0 3rem;
    }
    @include mobile() {
      margin: 0 1rem;
    }
  }
}
.swiper-custom-pagination {
  z-index: 15;
  position: absolute;
  width: 100%;
  bottom: 100px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .pagination-bullet {
    opacity: 1;
    flex: 1 0 auto;
    display: inline-block;
    position: relative;
    margin: 0 2px;
    padding-bottom: .75rem;
    span {
      font-size: 1rem;
      display: inline-block;
      color: rgba(white, 0.25);
      transition: all 0.5s ease;
      display: block;
      &.pagination-slide-title {
        font-weight: $mediumW;
      }
    }
    &:hover span {
      color: rgba(white, 1);
      @include tablet() {
        transform: translate(0, -20px);
      }
    }
    &::after, &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      height: 1px;
    }
    &::after {
      width: 0;
      background: rgba(white, 1);
      transition: width .25s ease;
    }
    &::before {
      width: 100%;
      background: rgba(white, 0.25);
    }
    &.active {
      span {
        color: white;
      }
      &::after {
        width: 100%;
        transition: width 6s ease;
      }
    }
    &:not(.active) {
      @include mobile() {
        visibility: hidden;
        opacity: 0;
      }
    }
    @include mobile() {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}


// Color themes
.slide-ui-Dark {
  .pagination-bullet {
    span {
      color: rgba(black, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(black, 1);
    }
    &::after {
      background: rgba(black, 1);
    }
    &::before {
      background: rgba(black, 0.25);
    }
  }
}

.slide-ui-Light {
  .pagination-bullet {
    span {
      color: rgba(white, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(white, 1);
    }
    &::after {
      background: rgba(white, 1);
    }
    &::before {
      background: rgba(white, 0.25);
    }
    &.active {
      color: white;
    }
  }
}
</style>
