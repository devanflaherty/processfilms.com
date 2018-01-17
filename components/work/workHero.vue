<template>
  <section class="hero work-hero is-fullheight">
    <heroLoader :hero-image="entry.hero_image" />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container">
        <h2 class="work-title" v-scroll-reveal="{duration: 2000, scale: 0.9, distance: '20px', delay: 900}">
          <strong :class="contrast">{{$prismic.asText(entry.title)}}</strong><br>
          <span :class="contrast" style="opacity: 0.8">{{$prismic.asText(entry.description)}}</span>
        </h2>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot"></div>
  </section>
</template>

<script>
import { TweenMax } from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}

export default {
  props: ['entry'],
  computed: {
    contrast () {
      return {
        'has-text-black': this.entry.hero_contrast === 'Dark',
        'has-text-white': this.entry.hero_contrast === 'Light'
      }
    }
  },
  mounted () {
    /* eslint-disable */
    let controller = new ScrollMagic.Controller()

    let slider = new ScrollMagic.Scene({
      duration: '150%',
      triggerHook: 'onEnter'
    })
      .setTween(
        TweenMax.to('.work-hero-image', 1, {
          autoAlpha: 0,
          y: "200px",
          force3D: true
        })
      )
      // .addIndicators({name:'headline'})
      .addTo(controller)
    /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-color: none;
}
.work-hero-image {
  background-size: cover;
  background-position: center;
  .hero-fade {
    z-index: 5;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25vh;
    width: 100%;
    box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1);
  }
}
</style>
