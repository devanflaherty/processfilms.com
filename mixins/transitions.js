import {TimelineMax, Back} from 'gsap'

const transitions = {
  methods: {
    beforeEnter (el) {

    },
    enter (el, done) {

    }, // afterEnter (el) beforeLeave (el) 
    leave (el, done) {
      var leave = new TimelineMax()

      if (el.querySelector('.stagger')) {
        var stagger = new TimelineMax()
        stagger.staggerTo(el.querySelectorAll('.stagger'), 1, {
          autoAlpha: 0,
          x: 100,
          ease: Back.easeIn
        })

        leave.add(stagger)
      }
      done()
    } // afterLeave (el)
  }
}

export default transitions
