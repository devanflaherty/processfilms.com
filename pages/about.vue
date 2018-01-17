<template>
  <section id="aboutPage" 
    class="page section push-top" 
    :data-wio-id="aboutPage.id"
    v-show="!loading">
    <div class="container about-wrap">
      <div class="about-welcome page-welcome columns">
        <div class="column">
          <div class="opening-headline"
            v-html="$prismic.asHtml(aboutPage.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column">
          <div class="opening-statement rich-text"
            v-html="$prismic.asHtml(aboutPage.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        </div>
      </div>
      <div class="columns is-multiline">
        <teamCard v-for="(post, index) in teamPosts" :key="index" :post="post"/>
      </div>
    </div>
  </section>
</template>

<script>
import {TimelineMax} from 'gsap'

// import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  head () {
    return {
      title: 'About'
    }
  },
  transition: {
    name: 'about',
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
      let child = el.querySelector('.about-wrap')
      let member = el.querySelector('.active')
      let members = el.querySelectorAll('.card-square:not(.active)')
      let leave = new TimelineMax()

      if (member) {
        leave.to(members, 0.5, {
          filter: 'blur(10px)'
        }, 0)
        leave.to(child, 0.5, {
          scale: 0.8
        })
        leave.to(child, 0.66, {
          autoAlpha: 0
        }, 1)
      } else {
        leave.to(child, 0.5, {
          autoAlpha: 0
        }, 0.5)
      }

      leave.addCallback(() => {
        window.scrollTo(0, 0)
      })
      leave.addCallback(() => {
        done()
      })
    }
  },
  async asyncData ({ params, app, store }) {
    let [teamPosts, aboutPage] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.query(
          app.$prismic.predicates.at('document.type', 'team_posts'),
          { orderings: '[my.team_posts.post_position, my.team_posts.member_name]' }
        )
      }), app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('pages', 'about')
      })
    ])
    return {
      team: teamPosts,
      teamPosts: teamPosts.results,
      aboutPage: aboutPage.data
    }
  },
  computed: {
    contrast () {
      return {
        'has-text-black': this.aboutPage.page_contrast === 'Dark',
        'has-text-white': this.aboutPage.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.aboutPage.background_color)
  },
  mounted () {
    if (this.teamPosts) {
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.aboutPage.primary_color, this.aboutPage.page_contrast)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
