<template>
  <div 
    :data-wio-id="document.id" 
    id="memberPage" 
    class="page push-top" 
    v-show="!loading">
    <section class="hero roster-hero is-large step">
      <heroLoader class="roster-hero-image" :hero-image="entry.member_hero"/>
      <!-- <div class="hero-body"></div> -->
    </section>
    
    <section class="section member-details">
      <div class="container">
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
            <prismic-link :link="link.link_url">{{link.link_label}}</prismic-link>
          </div>
        </div>
      </div><!-- close container -->
    </section>

    <section id="showcase" class="section" v-if="entry.related_work.length > 0">    
      <div class="work-cards container">
        <h2>Films I've worked on</h2>
        <div class="columns is-multiline is-marginless">
          <workCard v-for="(post, index) in entry.related_work" :key="index" :post="post.work_post" :index="index"/>
        </div>
      </div>
    </section>
    
    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.body" :key="index" 
      :slice="slice" :is="toCamelCase(slice.slice_type)" />

    <!-- Pagination -->
    <section class="section">
      <div class="container">
        <div class="article-pagination columns" :class="alignment">
          <div class="column is-6" v-if="prevMember">
            <nuxt-link class="post-button prev" :to="`/roster/${prevMember.uid}`">
              <h5 class="is-size-5">Meet</h5>
              <h3 class="is-size-3">{{$prismic.asText(prevMember.name)}}</h3>
              <span class="is-size-6 arrow arrow-left">{{prevMember.position}}</span>
            </nuxt-link>
          </div>
          <div class="column is-6" v-if="nextMember">
            <nuxt-link class="post-button next" :to="`/roster/${nextMember.uid}`">
              <h5 class="is-size-5">Meet</h5>
              <h3 class="is-size-3">{{$prismic.asText(nextMember.name)}}</h3>
              <span class="is-size-6 arrow next">{{nextMember.position}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

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
    beforeEnter,
    enter,
    leave
  },
  async asyncData ({ params, app, store }) {
    let [rosterPosts, member] = await Promise.all([
      store.dispatch('getRoster'),
      store.dispatch('getRosterMember', params.member)
    ])
    return {
      rosterPosts: rosterPosts.results,
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
    prevMember () {
      let member = this.rosterPosts[this.currentIndex - 1]
      if (member) {
        return {
          uid: member.uid,
          name: member.data.member_name,
          position: member.data.member_position
        }
      }
    },
    nextMember () {
      let current = this.currentIndex + 1
      if (this.rosterPosts.length > current) {
        let member = this.rosterPosts[this.currentIndex + 1]
        return {
          uid: member.uid,
          name: member.data.member_name,
          position: member.data.member_position
        }
      }
    },
    alignment () {
      return {
        'align-left': this.prevMember && !this.nextMember,
        'align-right': this.nextMember && !this.prevMember,
        'align-center': this.nextMember && this.prevMember
      }
    },
    contrast () {
      return {
        'has-text-black': this.entry.page_contrast === 'Dark',
        'has-text-white': this.entry.page_contrast === 'Light'
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('setNavColor', this.entry.nav_color)
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
    if (this.rosterPosts) {
      let index = this.rosterPosts.findIndex(el => {
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
      .setTween(TweenMax.to('.roster-hero-image', 1, {
        autoAlpha: 0,
        y: '200px'
      }))
      // .addIndicators({name:'headline'})
      .addTo(controller)
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
.roster-hero-image {
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

#showcase {
  h2 {
    margin-bottom: 2rem;
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
