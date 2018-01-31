<template>
  <section id="home" class="page">

    <heroSlider @sliderReady="setSliderAsReady" :gallery="home.hero_slider" v-if="home.hero_slider" />

    <section id="vision" class="padding-large section">
      <div class="container">
        <div class="columns">
          <div class="column is-12">
            <transition name="fade-in">
              <div class="vision-title" appear>
                <h1 v-if="!loading" v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '100px'}">{{$prismic.asText(home.hero_vision)}}</h1>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <section id="reel" class="is-marginless is-paddingless">
      <div class="container">
        <div class="reel">
          <responsiveVideo 
            :embed="home.work_reel" 
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '200px', delay: 200, viewFactor: 0.1}"/>
        </div>
      </div>
    </section>
        
    <section id="showcase" class="section is-marginless is-paddingless" v-if="home.featured_work.length > 0">    
      <div class="work-cards container">
        <div class="columns is-multiline is-marginless">
          <workCard v-for="(post, index) in home.featured_work" :key="index" :post="post.work_post" :index="index"/>
        </div>
      </div>
    </section>
    
    <clientLogos :logos="home.clients" :clientsInfo="clientsInfo" v-if="home.clients.length > 1"/>
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
  async asyncData ({ params, app, store }) {
    let home = await store.dispatch('getHome')
    return {
      document: home,
      home: home.data
    }
  },
  data () {
    return {
      ticking: false
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
    }
  },
  beforeMount () {
    this.$store.dispatch('setNavColor', 'transparent')
    this.$store.dispatch('setBackgroundColor', '#000')
    this.setPageStyle('#fff')
  },
  mounted () {
    if (this.document) {
      this.$waypoint.enableWaypoints()
      this.$store.dispatch('toggleLoading', false)
      this.$store.dispatch('toggleNavVis', true)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
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
