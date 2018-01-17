<template>
  <section 
    :data-wio-id="document.id" 
    id="memberPage" 
    class="page" 
    v-show="!loading">
    <div class="team-wrap step-parent">
      <section class="hero team-hero is-large step">
        <heroLoader class="team-hero-image" :hero-image="entry.member_hero"/>
        <!-- <div class="team-hero-image is-overlay" :style="`background-image: url(${entry.member_hero.url})`"></div> -->

        <!-- Hero content: will be in the middle -->
        <div class="hero-body"></div>
      </section>
      
      <section class="section member-details">
        <div class="container">
          <div class="team-pagination columns">
            <div class="column" v-if="prevMember">
              <a class="member-button arrow arrow-left prev" :href="`/team/${prevMember.uid}`">Meet {{$prismic.asText(prevMember.name)}}</a>
            </div>
            <div class="column" v-if="nextMember">
              <a class="member-button arrow next" :href="`/team/${nextMember.uid}`">Meet {{$prismic.asText(nextMember.name)}}</a>
            </div>
          </div>

          <div class="columns">
            <div class="column is-4">
              <h3 class="position">
                {{$prismic.asText(entry.member_name)}}
              </h3>
              <h4>{{entry.member_position}}</h4>
            </div>
            <div class="column">
              <div class="rich-text" v-html="$prismic.asHtml(entry.member_description)"></div>
            </div>
          </div>

          <div class="member-social columns" v-if="entry.social_links[0].link_label">
            <div class="column is-narrow" v-for="(link, index ) in entry.social_links" :key="index">
             <nuxt-link v-if="link.link_url.link_type === 'Document'" :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
             <a v-else :href="$prismic.asLink(link.link_url)" target="_blank" rel="noopener">{{link.link_label}}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.body" :key="index" 
      :slice="slice" :is="toCamelCase(slice.slice_type)" />
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax} from 'gsap'

if (process.browser) {
  // var scrollama = require('scrollama')
  var ScrollMagic = require('ScrollMagic')
  require('animation.gsap')
  // require('debug.addIndicators')
}
export default {
  head () {
    return {
      title: this.$prismic.asText(this.entry.member_name)
    }
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter (el) {
      let before = new TimelineMax()
      let child = el.querySelector('.team-wrap')
      before.set(child, {
        scale: 0.8
      })
      before.set(el, {
        autoAlpha: 0
      })
    },
    enter (el, done) {
      let child = el.querySelector('.team-wrap')
      let enter = new TimelineMax()
      enter.to(el, 1, {
        autoAlpha: 1
      })
      enter.to(child, 1, {
        scale: 1
      }, 0)
      enter.addCallback(() => {
        done()
      })
    },
    leave (el, done) {
      // let child = el.querySelector('.team-wrap')
      let leave = new TimelineMax()
      leave.to(el, 0.66, {
        autoAlpha: 0
      })

      leave.addCallback(() => {
        window.scrollTo(0, 0)
      })
      leave.addCallback(() => {
        done()
      })
    }
  },
  async asyncData ({ params, app, store }) {
    let [teamPosts, member] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.query(
          app.$prismic.predicates.at('document.type', 'team_posts'),
          {fetch: 'team_posts.member_name'}
        )
      }), app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('team_posts', params.member)
      })
    ])
    return {
      teamPosts: teamPosts.results,
      document: member,
      entry: member.data
    }
  },
  data () {
    return {
      currentIndex: null
    }
  },
  computed: {
    ...mapGetters(['teamSlugs']),
    prevMember () {
      let member = this.teamPosts[this.currentIndex - 1]
      if (member) {
        return {
          uid: member.uid,
          name: member.data.member_name
        }
      }
    },
    nextMember () {
      let current = this.currentIndex + 1
      if (this.teamPosts.length > current) {
        let member = this.teamPosts[this.currentIndex + 1]
        return {
          uid: member.uid,
          name: member.data.member_name
        }
      }
    },
    contrast () {
      return {
        'has-text-black': this.entry.page_contrast === 'Dark',
        'has-text-white': this.entry.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
    if (this.teamPosts) {
      let index = this.teamPosts.findIndex(el => {
        return el.uid === this.document.uid
      })
      this.currentIndex = index
    }

    if (this.document) {
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.entry.primary_color, 'Light')
      this.setHeroUiContrast('Light')

      this.$prismic.initApi().then((api) => {
        api.toolbar()
      })
    }

    /* eslint-disable */
    let controller = new ScrollMagic.Controller()
    
    let slider = new ScrollMagic.Scene({
      duration: '100%',
      triggerHook: 'onEnter'
    })
      .setTween(TweenMax.to('.team-hero-image', 1, {
        autoAlpha: 0,
        y: '200px'
      }))
      // .addIndicators({name:'headline'})
      .addTo(controller)

		// // using d3 for convenience
		// var container = document.querySelector('#memberPage')

		// // initialize the scrollama
		// var scroller = scrollama()

		// function handleStepProgress(response) {
    //   var el = response.element
    //   el.style.transform = `translate3d(0, ${response.progress}, 0)`
    //   console.log(response)
		// }

		// function init() {
		// 	// 1. setup the scroller with the bare-bones settings
		// 	// this will also initialize trigger observations
		// 	// 3. bind scrollama event handlers (this can be chained like below)
		// 	scroller.setup({
		// 		step: '.step-parent .step',
    //     progress: true,
    //     offset: 0,
		// 		debug: true,
		// 	})
		// 		.onStepProgress(handleStepProgress)

		// 	// setup resize event
		// 	window.addEventListener('resize', scroller.resize)
		// }

		// // kick things off
		// init()
	
    /* eslint-enable */
  },
  beforeDestroy () {
    this.setHeroUiContrast()
  }
}
</script>



<style lang="scss" scoped>
.is-light {
  background: white;
}
.hero {
  background-color: black;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}
.team-hero-image {
  background-size: cover;
  background-position: center;
  &::before {
    position: fixed;
    content: '';
  }
}

.member-details {
  padding-top: 4rem;
  padding-bottom: 8rem;
}

.team-pagination {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5rem;
  .member-button {
    flex: 0 1 auto;
    background: none;
    border: none;
    color: white;
    font-size: .75rem;
  }
  .column {
    &:last-child {
      .member-button {
        float: right;
      }
    }
  }
}
.member-social {
  padding-top: 2rem;
  justify-content: flex-end;
  a {
    position: relative;
    z-index: 1;
    &:after {
      content: '';
      display: block;
      background: white;
      height: 100%;
      width: 0;
      margin: auto;
      position: absolute;
      z-index: -1;
      top: 0;
      left: -7%;
      bottom: 0;
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.25);
    }
    &:hover {
      color: black;
      &:after {
        width: 115%!important;
      }
    }
  }
}
</style>
