import {TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}

const transitions = {
  methods: {
    fadeY (el, distance) {
      return TweenMax.fromTo(el, 1,
        {
          y: 0,
          autoAlpha: 1,
          force3D: true
        },
        {
          y: distance,
          autoAlpha: 0
        }
      )
    },
    fadeOut (el) {
      return TweenMax.fromTo(el, 1,
        {
          autoAlpha: 1
        },
        {
          autoAlpha: 0.3
        }
      )
    }
  },
  mounted () {
    /* eslint-disable */
    let controller = new ScrollMagic.Controller()

    let ui = new ScrollMagic.Scene({
      duration: '200%',
      triggerHook: 'onEnter'
    })
      .setTween(this.fadeY('.swiper-custom-pagination', -250))
      // .addIndicators({name:'headline'})
      .addTo(controller)
    
    let slider = new ScrollMagic.Scene({
      duration: '100%',
      triggerHook: 'onEnter'
    })
      .setTween(this.fadeOut('.slide-img'))
      // .addIndicators({name:'headline'})
      .addTo(controller)

    /* eslint-enable */
  }
}

export default transitions
