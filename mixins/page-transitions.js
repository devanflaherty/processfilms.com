import {TimelineMax, Back} from 'gsap'

export const beforeEnter = function (el, done) {
  let beforeEnter = new TimelineMax()
  beforeEnter.set(el, {
    autoAlpha: 0
  })
}

export const enter = function (el, done) {
  let enter = new TimelineMax()
  enter.to(el, 0.66, {
    autoAlpha: 1
  })

  enter.addCallback(() => {
    done()
  })
}

export const leave = function (el, done) {
  let leave = new TimelineMax()

  leave.to(el, 0.5, {
    autoAlpha: 0
  }, 0.5)

  if (el.querySelector('.stagger')) {
    console.log('stagger')
    let stagger = new TimelineMax()
    stagger.staggerTo('.stagger', 0.25, {
      autoAlpha: 0,
      x: 100,
      ease: Back.easeIn
    }, 0.125)

    leave.add(stagger)
  }

  leave.addCallback(() => {
    window.scrollTo(0, 0)
  })
  leave.addCallback(() => {
    done()
  })
}
