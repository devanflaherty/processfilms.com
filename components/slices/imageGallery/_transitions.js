import {TweenMax} from 'gsap'

if (process.browser) {
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  require('debug.addIndicators')
}

const transitions = {
  methods: {
    fadeY (el, distance) {
      return TweenMax.fromTo(el, 1,
        {
          y: 0,
          autoAlpha: 1
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
    },
    forEach (array, callback, scope) {
      for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]) // passes back stuff we need
      }
    }
  },
  mounted () {
    /* eslint-disable */
    let controller = new ScrollMagic.Controller()

    let sliders = document.querySelectorAll('.slice-slider')

    this.forEach(sliders, (index, value) => {
      let slice = sliders[index]
      let pagination = slice.querySelector('.slider-ui')
      let slideImage = slice.querySelector('.slide-img')

      let ui = new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: slice,
        triggerHook: 'onLeave',
        offset: 200
      })
        .setTween(
          TweenMax.fromTo('.swiper-custom-pagination', 1,
            {
              y: 0,
              autoAlpha: 1
            },
            {
              y: -250,
              autoAlpha: 0
            }
          )
        )
        // .addIndicators({name:'pagination'})
        .addTo(controller)
    })
    
    /* eslint-enable */
  }
}

export default transitions
