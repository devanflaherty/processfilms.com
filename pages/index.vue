<template>
  <section id="home" class="page">

    <section id="vision" class="padding-large section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <transition name="fade-in">
              <div class="vision-title" appear>
                <h1 v-if="!loading" v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '100px'}">{{$prismic.asText(home.hero_vision)}}</h1>
              </div>
            </transition>
          </div>

          <div class="column is-12">
            <div class="reel">
              <responsiveVideo 
                :embed="home.work_reel" 
                v-scroll-reveal="{duration: 1000, scale: 1, distance: '200px', delay: 200, viewFactor: 0.1}"/>
            </div>
          </div>
        </div>
      </div>
    </section>
        
    <section id="welcome" class="padding-large opening section">
      <div class="container">
        <div class="columns">
          <div class="column is-4">

            <a name="toBlack" id="waypoint" v-waypoint.down="{offset: 'bottom-in-view'}" @collision="changeBgColor('#000', '#fff', 'Light')"></a>

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

    <section id="featuredWork" v-waypoint.down="{offset: '0'}" @collision="changeBgColor('#fff', '#000', 'Dark')">
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
          <a name="toWhite" id="waypoint" v-waypoint.down="{offset: 'bottom-in-view'}" @collision="changeBgColor('#fff', '#000', 'Dark')"></a>
          <a name="toBlack" id="waypoint" v-waypoint.inview.up="{offset: '0'}" @exited="changeBgColor('#000', '#fff', 'Light')"></a>
        </div>
      </div>

      <div class="section work-cards" v-if="home.work_headline && home.work_statement">
        <div class="container">
          <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post"/>
        </div>
      </div>
    </section>

    <!-- <a name="toBlack" id="waypoint" v-waypoint.down="{offset: '90%'}" @collision="setBg('#000', '#fff')"></a>
    <a name="toWhite" id="waypoint" v-waypoint.up="{offset: '90%'}" @collision="setBg('#fff', '#000')"></a> -->
    
    <clientLogos :logos="home.clients" :clientsInfo="clientsInfo"/>
  </section>
</template>

<script>
import clientLogos from '~/components/home/clientLogos'
import {beforeEnter, enter} from '~/mixins/page-transitions'
import {TimelineMax} from 'gsap'

export default {
  components: {
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
      ticking: false
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
    changeBgColor (bg, primary, contrast) {
      this.setBg(bg, primary)
      this.setPageContrast(contrast)
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.setPageStyle('#fff')
  },
  mounted () {
    if (this.document) {
      this.$waypoint.enableWaypoints()
      this.$store.dispatch('toggleLoading', false)
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('setBackgroundColor', '#000')

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.raf)
    this.$waypoint.disableAllWaypoints()
    this.$waypoint.destroyWaypoints()
    // this.setBg(null)
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
#vision {
  padding-top: 50vh;
  @include mobile () {
    padding-top: 35vh;
  }
  .vision-title h1 {
    color: $white;
    font-size: 4rem;
    line-height: 1.2;
    @include mobile () {
      font-size: 2.75rem;
    }
  }
  .reel {
    padding-top: 15vh;
  }
}
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
