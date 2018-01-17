<template>
  <article class="slice slice-slider section"
    v-scroll-reveal="{scale: 1, distance: 0}"
    @beforeReveal="reveal">
    <transition name="photo-wipe">
      <div class="mask" :style="maskColor" v-if="hidden"></div>
    </transition>
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :class="`slide-ui-${slide.contrast}`" v-for="(slide, index) in slides" :key="index">
          
          <div class="slide-caption is-overlay">
            <div class="container">
              <div class="caption" 
                data-swiper-parallax="-300" 
                data-swiper-parallax-duration="500"
                data-swiper-parallax-opacity="0.5" v-html="$prismic.asHtml(slide.slide_description)"></div>
            </div>
          </div>

          <div v-lazy:background-image="slide.gallery_image.url" data-swiper-parallax="25%" class="slide-img"></div>
        </div>
      </div>

      <SliderUi 
          ref="pagination" 
          :tabs="slides" 
          :slideUi="slideUi" 
          :activeSlide="activeSlide" 
          @slideToEmit="slideTo"
          @pauseSliderEmit="pauseSlider()"
          @playSliderEmit="playSlider()"
          />
    </div>
    <!-- close swiper -->
  </article>
</template>

<script>
import SliderUi from './_sliderUi'
import sliderTransitions from './_transitions'

export default {
  components: {
    SliderUi
  },
  props: ['slides'],
  mixins: [sliderTransitions],
  data () {
    return {
      hidden: true,
      activeSlide: 0,
      slideUi: 'Light',
      swiperOption: {
        speed: 1000,
        initialSlide: 0,
        loop: true,
        slidesPerView: 1,
        observer: true,
        lazyLoading: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        on: {
          slideChange: (swiper) => {
            this.activeSlide = this.$refs.mySwiper.swiper.realIndex
          }
        }
      }
    }
  },
  computed: {
    maskColor () {
      if (this.backgroundColor) {
        return `background-color: ${this.backgroundColor}`
      } else {
        return `background-color: #ffffff`
      }
    }
  },
  watch: {
    loading () {
      if (!this.loading && this.$refs.mySwiper) {
        this.initSwiper()
      }
    },
    activeSlide (index) {
      let contrast = this.slides[index].contrast
      this.slideUi = contrast
    },
    slideUi (style, previousStyle) {
      this.setSliderUiContrast(style, previousStyle)
    }
  },
  methods: {
    reveal () {
      this.hidden = false
    },
    slideTo (index) {
      let i = index + 1
      this.$refs.mySwiper.swiper.slideTo(i)
    },
    pauseSlider () {
      this.$refs.mySwiper.swiper.autoplay.stop()
    },
    playSlider () {
      this.$refs.mySwiper.swiper.autoplay.start()
    },
    setSliderUiContrast (style, previousStyle) {
      let slider = this.$refs.mySwiper
      if (previousStyle && previousStyle !== style) {
        slider.classList.remove(`hero-ui-${previousStyle}`)
        slider.classList.add(`hero-ui-${style}`)
      } else if (!previousStyle) {
        if (!slider.classList.contains(`hero-ui-${style}`)) {
          if (style === 'Dark') {
            slider.classList.remove(`hero-ui-Light`)
          } else if (style === 'Light') {
            slider.classList.remove(`hero-ui-Dark`)
          }
          slider.classList.add(`hero-ui-${style}`)
        }
      }
    },
    initSwiper () {
      let swiper = this.$refs.mySwiper
      this.$swiper(swiper, this.swiperOption)
    }
  },
  created () {
    this.slideUi = this.slides[0].contrast
  },
  beforeDestroy () {
    this.$refs.mySwiper.swiper.destroy()
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~assets/styles/mixins';

.slice-slider {
  padding-left: 0;
  padding-right: 0; 
  min-height: 500px;
  height: 85vh;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  .slide-caption {
    z-index: 5;
    display: flex;
    align-items: center;
    padding: 2rem 3rem;
    color: black;
    line-height: 1;
    @include mobile () {
      padding: 2rem 1rem;
    }
    p {
      margin-bottom: 0;
    }
    .caption {
      transition: all 0.5s ease;
    }
  }
  .swiper-custom-pagination {
    bottom: 40px!important;
  }
}

.swiper-container, .swiper-slide {
  height: 100%;
}
.swiper-container {
  display: flex;
  .swiper-wrapper {
    .swiper-slide {
      flex: 1 0 100%;
      position: relative;
      overflow: hidden;
      .container {
        @include touch () {
          margin: 0;
        }
      }

      .slide-img {
        height: 100%;
        width: 100%;
        background-size: cover!important;
        background-position: center;
      }
    }
  }
}

// Color themes
.slide-ui-Dark {
  .caption {
    h2, h3, h4, h5 {
      color: black;
    }
    p, a, span {
      color: black;
    }
  }
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
  .caption {
    h2, h3, h4, h5 {
      color: white;
    }
    p, a, span {
      color: white;
    }
  }
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

@keyframes progress {
  0% {
    width: 0
  }
  100% {
    width: 100%;
  }
}
</style>
