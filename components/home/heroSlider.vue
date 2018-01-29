<template>
  <section id="heroSlider" class="hero is-paddingless">
    <div class="hero-body is-paddingless">
        
      <div id="slider" class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class="`slide-ui-${slide.contrast}`" v-for="(slide, index) in gallery" :key="index">
            
            <div class="slide-caption is-overlay">
              <div class="container">
                <div class="caption-wrap" :class="{'link-hover': slide.slide_link.url}">
                  <div class="caption" v-if="slide.slide_description">
                    <div class="rich-text"
                      data-swiper-parallax="-300" 
                      data-swiper-parallax-duration="500"
                      data-swiper-parallax-opacity="0.5"
                      v-html="$prismic.asHtml(slide.slide_description)"></div>
                  </div>

                  <a v-if="slide.slide_link.url" class="slide-link arrow" :href="$prismic.asLink(slide.slide_link)">{{slide.link_label}}</a>
                </div>
              </div>
            </div>
            <!-- <heroLoader @heroAvailable="setHeroReady" :hero-image="slide.slide_image" data-swiper-parallax="25%" class="slide-img" /> -->

            <div data-swiper-parallax="25%" class="slide-img" :style="`background-image: url(${slide.slide_image.large.url})`"></div>
          </div>
        </div>

        <SliderUi 
            ref="pagination" 
            :tabs="gallery" 
            :slideUi="slideUi" 
            :activeSlide="activeSlide" 
            @slideToEmit="slideTo"
            @pauseSliderEmit="pauseSlider()"
            @playSliderEmit="playSlider()"
            />
      </div>
      <!-- close swiper -->
    </div>
  </section>
</template>

<script>
// import {TimelineMax, TweenMax, Power4} from 'gsap'
import {mapGetters} from 'vuex'
import SliderUi from '~/components/slices/imageGallery/_sliderUi'
import heroTransitions from './_transitions'

export default {
  components: {
    SliderUi
  },
  props: ['gallery', 'ready'],
  mixins: [heroTransitions],
  data () {
    return {
      heroReady: false,
      ticking: false,
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
            if (this.$refs.mySwiper) {
              this.activeSlide = this.$refs.mySwiper.swiper.realIndex
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['mobileNav'])
  },
  watch: {
    activeSlide (index) {
      let contrast = this.gallery[index].contrast
      this.slideUi = contrast
      this.setLogoColor()
    },
    slideUi (style) {
      this.setHeroUiContrast(style)
    },
    mobileNav (visible) {
      if (visible) {
        this.pauseSlider()
      } else {
        this.playSlider()
      }
    }
  },
  methods: {
    // setHeroReady () {
    //   this.heroReady = true
    // },
    isReady: async function () {
      if (this.$refs.mySwiper) {
        return true
      }
    },
    isInit: async function () {
      if (this.$refs.mySwiper.swiper) {
        return true
      }
    },
    slideTo (index) {
      this.isInit().then(() => {
        let i = index + 1
        this.$refs.mySwiper.swiper.slideTo(i)
      })
    },
    pauseSlider () {
      this.isInit().then(() => {
        this.$refs.mySwiper.swiper.autoplay.stop()
      })
    },
    playSlider () {
      this.isInit().then(() => {
        this.$refs.mySwiper.swiper.autoplay.start()
      })
    },
    initSwiper () {
      this.isReady().then(() => {
        this.$emit('sliderReady')
        this.$swiper('#slider', this.swiperOption)
      }).catch((err) => {
        console.log(err)
      })
    },
    setLogoColor () {
      if (this.slideUi === 'Dark') {
        this.$store.dispatch('setPrimaryColor', '#000000')
      } else {
        this.$store.dispatch('setPrimaryColor', '#ffffff')
      }
    },
    raf () {
      if (!this.ticking) {
        window.requestAnimationFrame(this.scrollAction)
        this.ticking = true
      }
    },
    scrollAction () {
      let scrollTop = window.scrollY
      if (scrollTop >= 200) {
        this.pauseSlider()
      } else if (scrollTop < 200) {
        this.playSlider()
        this.setLogoColor()
      }
      this.ticking = false
    }
  },
  created () {
    this.slideUi = this.gallery[0].contrast
    this.setLogoColor()
  },
  mounted () {
    this.initSwiper()

    this.isInit().then(() => {
      window.addEventListener('scroll', this.raf)
      this.setHeroUiContrast(this.slideUi)
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.raf)
    this.setHeroUiContrast()
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~assets/styles/mixins';

#heroSlider {
  position: relative;
  overflow: hidden;
}
#slider {
  position: relative;
  width: 100%;
  height: 100vh;
  @include mobile() {
    height: 95vh;
  }
  &::after {
    content:'';
    z-index: 15;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25vh;
    width: 100%;
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1)
  }
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
    .caption-wrap {
      width: 50%;
      @include mobile() {
        width: 100%;
      }
      &.link-hover {
        transition: all 0.5s ease;
        &:hover {
          .caption {
            opacity: 0;
            transform: translate3d(0, -20px, 0) rotateX(90deg);
            perspective: 100px;
          }
          .slide-link {
            transform: translate3d(0, -20px, 0) rotateX(0deg);
            perspective: 100px;
            opacity: 1;
            visibility: visible;
          }
        }
      }
      .caption {
        transition: all 0.5s ease;
        position: relative;
        z-index: 1;
        transform-style: preserve-3d; 
        outline:1px solid transparent;
        text-shadow: 0 0 1px transparent;
        -webkit-font-smoothing: antialiased;
        p {
          margin-bottom: 0;
          font-size: 3rem;
          line-height: 1;
          @include mobile() {
            font-size: 2.5rem;
          }
        }
      }
    }
    .slide-link {
      transition: all 0.5s ease;
      transform: translate3d(0, 0, 0) rotateX(-90deg);
      opacity: 0;
      visibility: hidden;
    }
  }
}

.swiper-container, .swiper-slide {
  height: 100%;
  display: flex;
  .swiper-wrapper {
    // position: fixed;
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
      color: $black;
    }
    p, a, span {
      color: $black;
    }
  }
  .slide-link {
    color: $black;
  }
  // .pagination-bullet {
  //   span {
  //     color: rgba(black, 0.5);
  //   }
  //   &:hover span, &.active span {
  //     color: rgba(black, 1);
  //   }
  //   &::after {
  //     background: rgba(black, 1);
  //   }
  //   &::before {
  //     background: rgba(black, 0.25);
  //   }
  // }
}

.slide-ui-Light {
  .caption {
    h2, h3, h4, h5 {
      color: $white;
    }
    p, a, span {
      color: $white;
    }
  }
  .slide-link {
    color: $white;
  }
  // .pagination-bullet {
  //   span {
  //     color: rgba(white, 0.5);
  //   }
  //   &:hover span, &.active span {
  //     color: rgba(white, 1);
  //   }
  //   &::after {
  //     background: rgba(white, 1);
  //   }
  //   &::before {
  //     background: rgba(white, 0.25);
  //   }
  //   &.active {
  //     color: white;
  //   }
  // }
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
