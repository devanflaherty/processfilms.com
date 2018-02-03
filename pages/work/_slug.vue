<template>
  <section 
    id="workPage" 
    class="page push-top" 
    :class="contrast">
    <!-- <WorkHero :class="{'add-margin': margin === 'marginHero'}" :entry="entry" /> -->

    <section class="hero" v-if="entry.work_video.html">
      <div class="hero-body">
        <div class="hero-container container">
          <responsiveVideo
            v-if="entry.work_video"
            :embed="entry.work_video" 
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '-200px'}"/>
        </div>
      </div>
    </section>

    <section class="section work-info">
      <div class="container">
        <div class="columns flex-center">
          <div class="column is-10">
            <h2 class="is-size-1">{{$prismic.asText(entry.title)}}</h2>

            <div class="columns">
              <div class="column is-6">
                <div class="work-approach rich-text"
                  v-if="entry.approach.length > 0"
                  v-html="$prismic.asHtml(entry.approach)"
                  v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
                </div>

                <div class="column is-5 is-offset-1-tablet">
                  <ul class="roster-list">
                    <li class="roster-member" v-for="(member, index) in entry.work_roster" :key="index" :class="{'roster-member--hidden': index > 2}">
                      <h6>{{member.member_position}}</h6>
                      <prismic-link class="hilite" v-if="member.member_link.id" :link="member.member_link">{{member.member_name}}</prismic-link>
                      <span v-else>{{member.member_name}}</span>
                    </li>
                  </ul>
                  <button v-if="entry.work_roster.length > 3" class="roster-list-button" @click="showAllRoster">+</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.slices" :key="index" 
      :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>


    <!-- Pagination -->
    <section class="section">
      <div class="container">
        <div class="article-pagination columns" :class="alignment">
          <div class="column is-6" v-if="prevPost">
            <nuxt-link class="post-button prev" :to="`/work/${prevPost.uid}`">
              <h5 class="is-size-5">Previous</h5>
              <h3 class="is-size-3">{{$prismic.asText(prevPost.title)}}</h3>
              <!-- <span class="is-size-6 arrow arrow-left">{{prevPost.position}}</span> -->
            </nuxt-link>
          </div>
          <div class="column is-6" v-if="nextPost">
            <nuxt-link class="post-button next" :to="`/work/${nextPost.uid}`">
              <h5 class="is-size-5">Next</h5>
              <h3 class="is-size-3">{{$prismic.asText(nextPost.title)}}</h3>
              <!-- <span class="is-size-6 arrow next">{{nextMember.position}}</span> -->
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import { beforeEnter, enter, leave } from '~/mixins/page-transitions'
import WorkHero from '~/components/work/workHero'
import {TimelineMax, Back} from 'gsap'

export default {
  head () {
    return {
      title: this.seoTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.seoDesc },
        { hid: 'og:url', property: 'og:url', content: this.seoUrl },
        { hid: 'og:image', property: 'og:image', content: this.seoImage },
        { hid: 'og:title', property: 'og:title', content: this.seoTitle },
        { hid: 'og:description', property: 'og:description', content: this.seoDesc },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:domain', name: 'twitter:domain', value: this.seoUrl },
        { hid: 'twitter:title', name: 'twitter:title', value: this.seoTitle },
        { hid: 'twitter:description', name: 'twitter:description', value: this.seoDesc },
        { hid: 'twitter:image', name: 'twitter:image', content: this.seoImage },
        { hid: 'twitter:url', name: 'twitter:url', value: this.seoUrl }
      ],
      link: [
        { hid: 'image_src', rel: 'image_src', href: this.seoImage }
      ]
    }
  },
  components: {
    WorkHero
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  async asyncData ({ app, params, store, error }) {
    try {
      let entry = await store.dispatch('getWorkPost', params.slug)

      await store.dispatch('getWork')

      return {
        document: entry,
        entry: entry.data
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  data () {
    return {
      currentIndex: null,
      showRoster: false
    }
  },
  computed: {
    ...mapGetters(['breakpoint']),
    ...mapGetters(['work']),
    prevPost () {
      let post = this.work.results[this.currentIndex - 1]
      if (post) {
        return {
          uid: post.uid,
          title: post.data.title
        }
      }
    },
    nextPost () {
      let current = this.currentIndex + 1
      if (this.work.results.length > current) {
        let post = this.work.results[this.currentIndex + 1]
        return {
          uid: post.uid,
          title: post.data.title
        }
      }
    },
    alignment () {
      return {
        'align-left': this.prevPost && !this.nextPost,
        'align-right': this.nextPost && !this.prevPost,
        'align-center': this.nextPost && this.prevPost
      }
    },
    seoTitle () {
      if (this.entry.meta_title > 0) {
        return this.entry.meta_title
      } else {
        return this.$prismic.asText(this.entry.title)
      }
    },
    seoDesc () {
      if (this.entry.meta_description) return this.entry.meta_description
      return this.$prismic.asText(this.entry.approach)
    },
    seoImage () {
      if (this.entry.meta_image) return this.entry.meta_image.url
      return this.entry.feature_image.large.url
    },
    seoUrl () {
      return 'https://processfilms.com' + this.$route.fullPath
    },
    contrast () {
      return {
        'has-text-black': this.entry.page_contrast === 'Dark',
        'has-text-white': this.entry.page_contrast === 'Light'
      }
    },
    margin () {
      if (!this.entry.highlight_video.html && !this.entry.aproach) return 'marginHero'
    }
  },
  methods: {
    showAllRoster () {
      let hidden = new TimelineMax()
      let items = [].slice.call(document.querySelectorAll('.roster-member--hidden'))

      if (!this.showRoster) {
        this.showRoster = true
        hidden
          .set(items, {
            y: 20
          })
          .staggerTo(items, 0.5, {
            y: 0,
            height: '5rem',
            autoAlpha: 1,
            marginBottom: '1rem',
            ease: Back.easeOut.config(1.7)
          }, 0.125)
      } else {
        this.showRoster = false
        hidden
          .staggerTo(items.reverse(), 0.25, {
            y: 20,
            height: 0,
            autoAlpha: 0,
            marginBottom: 0,
            ease: Back.easeOut.config(1.7)
          }, 0.125)
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('setNavColor', this.entry.nav_color)
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
    if (this.work) {
      let index = this.work.results.findIndex(el => {
        return el.uid === this.document.uid
      })
      this.currentIndex = index
    }

    if (this.document) {
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.entry.primary_color, this.entry.page_contrast)

      this.$prismic.initApi().then(api => {
        api.toolbar()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.hero {
  margin-bottom: 100px;
  .hero-body {
    padding: 0;
  }
  .hero-container {
    padding: 0 3rem;
    margin: 0 auto;
    @include desktop-only () {
      padding: 0;
    }
    @include touch () {
      padding: 0;
    }
  }
}

.work-info {
  .flex-center {
    justify-content: center;
  }
  h2 {
    line-height: 1;
    margin-bottom: 4rem;
  }
  .roster-member {
    margin-bottom: 1rem;
    height: 5rem;
    &--hidden {
      height: 0;
      overflow: hidden;
      visibility: hidden;
      margin: 0;
    }
  }
  .roster-list-button {
    background: none;
    border: none;
    outline: none;
    height: 2rem;
    width: 2rem;
    padding: 0;
    line-height: 1;
  }
}

.add-margin {
  margin-bottom: 200px;
}
</style>
