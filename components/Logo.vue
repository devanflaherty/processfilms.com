<template>
<div @mouseleave="hover('leave')" @mouseover="hover('enter')" class="processLogo" :class="status">

  <svg viewBox="0 0 584 483" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <router-link to="/" class="logo-link" :class="{'ready': ready}, status">
      <g class="symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g class="logo" transform="translate(0.000000, -1.000000)">
              <g class="logo-fill" ref="logoFill" :class="{'is-mobile': mobileNav}" :fill="primaryColor">
                <polygon class="slash" ref="slash" points="97.2207 97.5187 -0.0003 338.8097 97.2577 338.8097 194.4727 97.5187"></polygon>
                <path d="M413.1976,1.0077 L413.1976,0.9997 L291.6666,0.9997 L194.4566,0.9997 L194.4196,97.5187 L291.6716,97.5187 L413.1976,97.5187 C453.4636,97.5187 486.1126,129.9267 486.1126,169.9037 C486.1126,209.8827 453.4636,242.2917 413.1976,242.2917 L291.6716,242.2917 L291.6716,97.5187 L194.4566,338.8097 L194.4566,483.5797 L291.6666,483.5797 L291.6666,338.8097 L413.1976,338.8097 C507.1586,338.8097 583.3226,263.1907 583.3226,169.9087 C583.3226,76.6267 507.1586,1.0077 413.1976,1.0077" 
                class="charachter"
                ref="charachter"></path>
                <rect fill-opacity="0" fill="#ffffff" class="bg" x="0" y="0" width="584" height="484"></rect>
              </g>
          </g>
      </g>
    </router-link>
  </svg>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax, TweenMax, Expo} from 'gsap'

export default {
  props: ['color', 'size', 'animate'],
  computed: {
    ...mapGetters(['mobileNav', 'breakpoint'])
  },
  data () {
    return {
      ready: false,
      status: null
    }
  },
  watch: {
    status (s) {
      if (s === 'enter') {
        TweenMax
          .to(this.$refs.slash, 0.5, {
            x: 100,
            repeat: -1,
            ease: Expo.easeIn,
            yoyo: true
          })
      } else {
        TweenMax.killTweensOf(this.$refs.slash)
        TweenMax
          .to(this.$refs.slash, 0.66, {
            x: 0,
            ease: Expo.easeOut
          })
      }
    }
  },
  methods: {
    hover (status) {
      this.status = status
    },
    animateIn () {
      // var filler = this.$refs.logoFill
      let logoAnimation = new TimelineMax()
      let slash = this.$refs.slash
      let p = this.$refs.charachter

      logoAnimation
        .set(slash, {
          x: 300
        })
        .set(p, {
          autoAlpha: 0,
          x: -180
        })
        .to(slash, 0.6, {
          x: 0,
          ease: Expo.easeOut
        }, 0.5)
        .to(p, 0.33, {
          autoAlpha: 1,
          x: 0,
          ease: Expo.easeOut,
          onComplete: this.onReady
        }, 1)
    },
    onReady () {
      this.ready = true
    }
  },
  mounted () {
    if (this.animate) {
      this.animateIn()
    }
  }
}
</script>


<style lang="scss" scoped>
.processLogo {
  height: 0;
  width: 100%;
  min-width: 40px;
  padding-top: 82.70%;
  position: relative;
  z-index: 100;
  display: inline-block;
  .logo-link {
    color: none!important;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    transition: fill 0.5s ease;
    g.logoFill.is-mobile {
      fill: black!important;
    }
    g.logoFill {
      fill: white;
      transition: fill 0.5s ease;
    }
  }
  svg a {
    display: block;
    .slash {
      animation: process 2s ease infinite;
    }
  }
  &.ready:not(:hover) svg .slash {
    animation: process 2s ease;
  }
}
</style>
