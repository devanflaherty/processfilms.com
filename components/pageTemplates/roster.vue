<template>
  <section class="roster-page section push-top" >
    
    <div class="container roster-wrap">
      <div class="columns is-multiline is-marginless">
        <div class="roster-details column is-6">
          <div class="title"
            v-html="$prismic.asHtml(page.page_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>          
        </div>
      
        <!-- ROSTER LOOP-->
        <rosterCard v-for="(post, index) in roster.results" :key="index" :post="post" :index="index" />
      </div> <!-- close columns -->
    </div><!-- close container -->

  </section>
</template>

<script>
import {TimelineMax} from 'gsap'
import {mapGetters} from 'vuex'

export default {
  props: ['page'],
  transition: {
    name: 'roster',
    mode: 'out-in',
    css: false,
    beforeEnter (el) {
      let before = new TimelineMax()
      before.set(el, {
        autoAlpha: 0
      })
    },
    enter (el, done) {
      let enter = new TimelineMax()
      enter.to(el, 1, {
        autoAlpha: 1
      })
      enter.addCallback(() => {
        done()
      })
    },
    leave (el, done) {
      let child = el.querySelector('.roster-wrap')
      let member = el.querySelector('.active')
      let members = el.querySelectorAll('.card-square:not(.active)')
      let leave = new TimelineMax()

      if (member) {
        leave.to(members, 0.5, {
          autoAlpha: 0.6
        }, 0)
        leave.to(child, 0.66, {
          autoAlpha: 0
        }, 1)
      } else {
        leave.to(child, 0.5, {
          autoAlpha: 0
        }, 0.5)
      }

      leave.addCallback(() => {
        done()
      })
    }
  },
  computed: {
    ...mapGetters(['roster'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
.roster-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include mobile () {
    margin: 2rem 0;
  }
  > div {
    width: 85%;
    @include mobile () {
      width: 100%;
    }
  }
}
</style>
