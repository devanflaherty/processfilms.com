<template>

<div @mouseleave="hover('leave')" @mouseover="hover('enter')" class="samsonLogo" :class="status">
<svg viewBox="0 0 380 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <mask id="clip">
      <path id="s-shape" fill="white" d="M0,42.814 L5.212,36.618 C9.929,40.701 14.646,43.024 20.774,43.024 C26.125,43.024 29.506,40.559 29.506,36.829 L29.506,36.686 C29.506,33.166 27.533,31.266 18.379,29.151 C7.888,26.618 1.971,23.519 1.971,14.435 L1.971,14.294 C1.971,5.844 9.014,0 18.801,0 C25.983,0 31.687,2.182 36.688,6.197 L32.04,12.745 C27.604,9.435 23.168,7.675 18.661,7.675 C13.591,7.675 10.634,10.28 10.634,13.52 L10.634,13.661 C10.634,17.463 12.886,19.152 22.323,21.406 C32.745,23.942 38.167,27.672 38.167,35.841 L38.167,35.981 C38.167,45.208 30.913,50.701 20.561,50.701 C13.028,50.701 5.915,48.094 0,42.814"></path>
    </mask>
  </defs>
  <router-link to="/" class="logo-link" :class="status">
    <rect id="Rectangle" fill="transparent" x="0" y="0" width="380" height="60"></rect>
    <g id="samsonMark" :class="{'is-mobile': mobileNav}" transform="translate(0, 7.000000)"> <!-- translate(17.000000, 17.000000) -->
      <path class="char" id="s" fill="none" :stroke="primaryColor" stroke-width="25" mask="url(#clip)" d="M38.3911952,12.546594 C20.7570474,3.02944477 10.3621029,3.46908759 7.20636164,13.8655224 C5.56999618,20.0652313 7.9664221,23.9679927 14.3956394,25.5738067 C24.9686765,28.061887 30.6456575,30.0279846 31.4265824,31.4720994 C32.5979697,33.6382718 33.9504302,34.0842484 33.9504302,39.5164452 C33.9504302,44.948642 30.0757048,47.4244272 26.0402128,48.71653 C22.0047207,50.0086328 10.8591228,49.2139225 0.729081691,39.5164452"></path>
      
      <g id="type" stroke="none" :fill="primaryColor" fill-rule="evenodd">
        <path class="char" id="a-shape" d="M92.0272,30.5607 L83.5062,10.8447 L75.0552,30.5607 L92.0272,30.5607 Z M79.6322,0.4917 L87.6602,0.4917 L109.3492,50.1367 L100.1942,50.1367 L95.1942,38.2377 L71.8872,38.2377 L66.8152,50.1367 L57.9442,50.1367 L79.6322,0.4917 Z"></path>
        <polygon class="char" id="m-shape" points="133.1385 0.8444 142.3625 0.8444 157.3615 24.1524 172.3605 0.8444 181.5865 0.8444 181.5865 50.1364 172.9235 50.1364 172.9235 14.7874 157.3615 38.0264 157.0795 38.0264 141.6595 14.9274 141.6595 50.1364 133.1385 50.1364"></polygon>
        <path class="char" id="s2-shape" d="M205.7972,42.9552 L211.0082,36.7592 C215.7262,40.8422 220.4432,43.1652 226.5702,43.1652 C231.9222,43.1652 235.3022,40.7002 235.3022,36.9702 L235.3022,36.8272 C235.3022,33.3072 233.3292,31.4072 224.1762,29.2922 C213.6842,26.7592 207.7672,23.6602 207.7672,14.5762 L207.7672,14.4352 C207.7672,5.9852 214.8102,0.1412 224.5972,0.1412 C231.7792,0.1412 237.4842,2.3232 242.4852,6.3382 L237.8362,12.8862 C233.4002,9.5762 228.9642,7.8162 224.4582,7.8162 C219.3882,7.8162 216.4312,10.4212 216.4312,13.6612 L216.4312,13.8022 C216.4312,17.6042 218.6832,19.2932 228.1202,21.5472 C238.5412,24.0832 243.9632,27.8132 243.9632,35.9822 L243.9632,36.1222 C243.9632,45.3492 236.7102,50.8422 226.3582,50.8422 C218.8252,50.8422 211.7112,48.2352 205.7972,42.9552"></path>
        <path class="char" id="o-shape" d="M306.3455,25.6305 L306.3455,25.4905 C306.3455,15.9145 299.3735,7.9575 289.5865,7.9575 C279.7975,7.9575 272.9675,15.7735 272.9675,25.3515 L272.9675,25.4905 C272.9675,35.0675 279.9385,43.0255 289.7255,43.0255 C299.5155,43.0255 306.3455,35.2075 306.3455,25.6305 M263.8825,25.6305 L263.8825,25.4905 C263.8825,11.6185 274.5875,0.0005 289.7255,0.0005 C304.8665,0.0005 315.4295,11.4775 315.4295,25.3515 L315.4295,25.4905 C315.4295,39.3635 304.7245,50.9815 289.5865,50.9815 C274.4455,50.9815 263.8825,39.5055 263.8825,25.6305"></path>
        <polygon class="char" id="n-shape" points="336.825 0.8444 344.852 0.8444 371.259 34.9274 371.259 0.8444 379.78 0.8444 379.78 50.1364 372.527 50.1364 345.346 15.0684 345.346 50.1364 336.825 50.1364"></polygon>
      </g>
    </g>
  </router-link>
</svg>

</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {TweenMax, TimelineMax, Back, Quart} from 'gsap'

export default {
  props: ['color', 'size', 'animate', 'scrolledLogo'],
  data () {
    return {
      status: null,
      animated: false
    }
  },
  computed: {
    ...mapGetters(['mobileNav', 'breakpoint'])
  },
  watch: {
    status (s) {
      this.hoverAnimation(s)
    },
    scrolledLogo (val) {
      if (this.animated) {
        this.scrollAnimation(val)
      }
    },
    animated (val) {
      if (this.scrolledLogo) {
        this.scrollAnimation(val)
      }
    }
  },
  methods: {
    hover (status) {
      this.status = status
    },
    hoverAnimation (status) {
      let tl = new TimelineMax()

      if (status === 'enter') {
        TweenMax.killTweensOf('.char')
        tl.staggerTo('.char', 0.33, {
          y: 24,
          ease: Back.easeOut.config(2.5)
        }, 0.125)
      } else {
        TweenMax.killTweensOf('.char')
        TweenMax.to('.char', 0.66, {
          y: 0,
          ease: Back.easeOut.config(2.5)
        })
      }
    },
    scrollAnimation (bool) {
      if (bool) {
        TweenMax.to('#type', 1.25, {
          y: 40,
          autoAlpha: 0,
          ease: Back.easeOut.config(1.7)
        })
      } else {
        TweenMax.to('#type', 0.66, {
          y: 0,
          autoAlpha: 1,
          ease: Back.easeOut.config(1.7)
        })
      }
    },
    animateIn () {
      var logoTimeline = new TimelineMax()

      let pathLength = (p) => {
        var pathLength = document.getElementById(p).getTotalLength()
        return pathLength
      }

      logoTimeline
        .set('#type > *', {
          autoAlpha: 0,
          y: 40
        })
        .fromTo('#s', 0.5, {
          strokeDasharray: pathLength('s'),
          strokeDashoffset: pathLength('s')
        }, {
          strokeDashoffset: 0,
          ease: Quart.easeOut
        }, 0.35)
        .staggerTo('#type > *', 0.33, {
          autoAlpha: 1,
          y: 0,
          ease: Back.easeOut.config(2.5)
        }, 0.125)
        .addCallback(() => {
          this.animated = true
        })
    }
  },
  mounted () {
    if (this.navVis) {
      this.animateIn()
    }
  }
}
</script>


<style lang="scss" scoped>
.samsonLogo {
  height: 0;
  width: 100%;
  min-width: 120px;
  padding-top: 15%;
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
    overflow: hidden;
    path, polyline, polygon {
      transition: fill 0.5s ease, stroke 0.5s ease;
    }
    g#samsonMark {
      &.is-mobile, &.lockedColor {
        #s {
          stroke: black!important;
        }
        #type {
          fill: black!important;
        }
      }
    }
  }
  svg a {
    display: block;
    text-decoration: none;
  }
}
</style>
