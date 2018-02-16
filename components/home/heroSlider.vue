<template>
  <section id="heroSlider" class="hero is-paddingless">
    <div class="hero-body is-paddingless">
        
      <div id="slider" class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class="`slide-ui-${slide.contrast}`" v-for="(slide, index) in gallery" :key="index">
            
            <div class="slide-info is-overlay">
              
              <div class="slide-title-wrap" :class="{'link-hover': slide.slide_link.url}">
                <a v-if="slide.slide_link.url" class="slide-link" :href="$prismic.asLink(slide.slide_link)">
                  <div class="slide-title" v-if="slide.slide_description">
                    <div class="rich-text"
                      data-swiper-parallax="-300" 
                      data-swiper-parallax-duration="500"
                      data-swiper-parallax-opacity="0.5"
                      v-html="$prismic.asHtml(slide.slide_description)"></div>

                    <span class="link-text">{{slide.link_label}}</span>
                  </div>
                </a>
                
                <div v-else-if="slide.slide_description && !slide.slide_link.url" class="caption">
                  <div class="rich-text"
                    data-swiper-parallax="-300" 
                    data-swiper-parallax-duration="500"
                    data-swiper-parallax-opacity="0.5"
                    v-html="$prismic.asHtml(slide.slide_description)"></div>
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
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1);
    @include mobile () {
      height: 15vh;
    }
  }
  .slide-info {
    display: flex;
    padding: 0 3rem;
    color: black;
    line-height: 1;
    align-items: center;
    z-index: 5;
    @include mobile () {
      padding: 0 1rem;
    }
    .slide-title-wrap {
      width: 95%;
      text-align: center;
      display: flex;
      justify-content: center;
      .slide-link {
        &:after {
          content: '';
          @include overlay();
          background: rgba($black, 0.1);
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            background: rgba($black, 0.6);
          }
        }
      }
      .slide-title {
        font-family: -apple-system, BlinkMacSystemFont, 'Inter UI', "Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        transition: all 0.5s ease;
        position: relative;
        z-index: 1;
        transform-style: preserve-3d; 
        outline:1px solid transparent;
        text-shadow: 0 0 1px transparent;
        -webkit-font-smoothing: antialiased;
        @include mobile () {
          position: absolute;
          left: 0; right: 0;
          bottom: 10rem;
        }
        p {
          margin-bottom: 0;
          font-size: 4rem;
          font-weight: 200!important;
          line-height: 1;
          letter-spacing: -0.5px;
          @include mobile() {
            font-size: 2.5rem;
          }
        }
        .link-text {
          margin-top: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 1rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
        }
      }
    }

    .link-hover {
      span {
        transition: all 0.5s ease;
        display: block;
      }
      &:hover {
        .slide-title {
          transform: translate3d(0, -20px, 0);
        }
        span {
          transform: translate3d(0, -10px, 0);
        }
      }
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
