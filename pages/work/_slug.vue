<template>
  <section 
    id="workPage" 
    class="page push-top" 
    :class="contrast"
    v-show="!loading">
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
                  <div class="director roster-member" v-for="(member, index) in entry.work_roster" :key="index">
                    <h6>{{member.member_position}}</h6>
                    <prismic-link class="hilite" v-if="member.member_link.id" :link="member.member_link">{{member.member_name}}</prismic-link>
                    <span v-else>{{member.member_name}}</span>
                  </div>
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
            <a class="post-button prev" :href="`/work/${prevPost.uid}`">
              <h5 class="is-size-5">Previous</h5>
              <h3 class="is-size-3">{{$prismic.asText(prevPost.title)}}</h3>
              <!-- <span class="is-size-6 arrow arrow-left">{{prevPost.position}}</span> -->
            </a>
          </div>
          <div class="column is-6" v-if="nextPost">
            <a class="post-button next" :href="`/work/${nextPost.uid}`">
              <h5 class="is-size-5">Next</h5>
              <h3 class="is-size-3">{{$prismic.asText(nextPost.title)}}</h3>
              <!-- <span class="is-size-6 arrow next">{{nextMember.position}}</span> -->
            </a>
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
  async asyncData ({ app, params, store }) {
    let entry = await store.dispatch('getWorkPost', params.slug)

    await store.dispatch('getWork')

    return {
      document: entry,
      entry: entry.data
    }
  },
  data () {
    return {
      currentIndex: null
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
  created () {
    this.$store.dispatch('toggleLoading', true)
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
  }
}

.add-margin {
  margin-bottom: 200px;
}
</style>
