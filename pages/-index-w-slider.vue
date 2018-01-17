<template>
  <section id="home" class="page" :data-wio-id="document.id">
    
    <heroSlider @sliderReady="setSliderAsReady" :gallery="home.hero_slider" v-if="home.hero_slider" />
    
    <section id="welcome" class="padding-large opening section">
      <div class="container">
        <div class="columns">
          <div class="column is-4">

            <a name="toBlack" id="waypoint" v-waypoint.down="{offset: 'bottom-in-view'}" @collision="setBg('#000', '#fff')"></a>

            <h3 class="opening-headline has-text-white"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'left'}">
              {{$prismic.asText(home.opening_headline)}}
            </h3>
          </div>
          <div class="column">
            <div class="opening-statement has-text-white" 
              v-html="$prismic.asHtml(home.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 100}"></div>

            <h3 class="list-headline"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 200}">
              Capabilities
            </h3>
            <div class="column-list" v-html="$prismic.asHtml(home.capabilities)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 300}"></div>
            <div class="statement" v-html="$prismic.asHtml(home.closing_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 400}"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="featuredWork" v-waypoint.down="{offset: '0'}" @collision="setBg('#fff', '#000')">
      <div class="section" v-if="home.work_headline && home.work_statement">
        <div class="container">
          <div class="work-welcome columns">
            <div class="column">
              <h3 class="opening-headline has-text-black" 
                v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'left'}">
                {{$prismic.asText(home.work_headline)}}
              </h3>
            </div>
            <div class="column">
              <div class="work-statement has-text-black rich-text" 
                v-html="$prismic.asHtml(home.work_statement)"
                v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 200}"></div>
            </div>
          </div>
          <a name="toWhite" id="waypoint" v-waypoint.down="{offset: 'bottom-in-view'}" @collision="setBg('#fff', '#000')"></a>
          <a name="toBlack" id="waypoint" v-waypoint.inview.up="{offset: '0'}" @exited="setBg('#000', '#fff', 'up')"></a>
        </div>
      </div>

      <div class="section work-cards" v-if="home.work_headline && home.work_statement">
        <div class="container">
          <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post"/>
        </div>
      </div>
    </section>

    <a name="toBlack" id="waypoint" v-waypoint.down="{offset: '90%'}" @collision="setBg('#000', '#fff')"></a>
    <a name="toWhite" id="waypoint" v-waypoint.up="{offset: '90%'}" @collision="setBg('#fff', '#000')"></a>
    
    <clientLogos :logos="home.clients" :clientsInfo="clientsInfo"/>
  </section>
</template>

<script>
import heroSlider from '~/components/home/heroSlider'
import clientLogos from '~/components/home/clientLogos'
import {beforeEnter, enter} from '~/mixins/page-transitions'
import {TimelineMax} from 'gsap'

export default {
  components: {
    heroSlider,
    clientLogos
  },
  asyncData ({ params, app, store }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getSingle('home', {'fetchLinks': 'work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color'}).then((res) => {
        return {
          document: res,
          home: res.data
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  data () {
    return {
      ticking: false,
      cords: {}
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  transition: {
    name: 'home',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave: (el, done) => {
      let leave = new TimelineMax()

      leave.to(el, 0.5, {
        autoAlpha: 0
      }, 0.25)

      // leave.to(window, 0.1, { scrollTo: 0 })
      leave.addCallback(() => {
        window.scrollTo(0, 0)
      })
      leave.addCallback(() => {
        done()
      })
    }
  },
  computed: {
    clientsInfo () {
      return {
        'headline': this.home.client_headline,
        'statement': this.home.client_statement
      }
    }
  },
  methods: {
    setSliderAsReady () {
      this.$store.dispatch('toggleLoading', false)
      this.$store.dispatch('toggleNavVis', true)
    },
    raf () {
      if (!this.ticking) {
        window.requestAnimationFrame(this.updateBgScrollAction)
        this.ticking = true
      }
    },
    updateBgScrollAction () {
      let wh = window.innerHeight
      let trigger = wh / 2
      let scrollTop = window.scrollY
      if (scrollTop >= trigger) {
        this.setPrimaryColor('#fff')
      }
      this.ticking = false
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.setPageContrast()
  },
  mounted () {
    if (this.document) {
      this.$waypoint.enableWaypoints()
      this.$store.dispatch('setBackgroundColor', '#000')
      window.addEventListener('scroll', this.raf)
      this.raf()

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.raf)
    this.$waypoint.disableAllWaypoints()
    this.$waypoint.destroyWaypoints()
    // this.setBg(null)
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
#welcome {
  min-height: 100%;
  padding-top: 200px;
  padding-bottom: 200px;
}
#featuredWork {
  padding-top: 200px;
  position: relative;
  .work-welcome {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

.work-cards {
  @include mobile () {
    padding: 0;
    margin: 0;
    .container {
      padding: 0;
      margin: 0;
    }
  }
}

#clients {
  padding: 6rem 0 2rem;
  h2 {
    margin-bottom: 3.5rem;
  }
}
</style>
