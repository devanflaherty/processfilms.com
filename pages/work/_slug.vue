<template>
  <section 
    :data-wio-id="document.id" 
    id="workPage" 
    class="page" 
    :class="contrast"
    v-show="!loading">
    <WorkHero :class="{'add-margin': margin === 'marginHero'}" :entry="entry" />

    <section class="section" v-if="entry.highlight_video.html || entry.approach.length > 0">
      <div class="container">
        <div class="work-approach rich-text"
          v-if="entry.approach.length > 0"
          v-html="$prismic.asHtml(entry.approach)"
          v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        <responsiveVideo
          class="work-highlight-video"
          v-if="entry.highlight_video.html"
          :embed="entry.highlight_video" 
          v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '200px'}"/>
      </div>
    </section>
    
    <section id="workContent" class="opening section">
      <div class="container">
        <div class="columns opener">
          <div class="column is-4">
            <div class="opening-headline"
              v-html="$prismic.asHtml(entry.opening_headline)"
              v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
          </div>
          <div class="column">
            <div class="opening-statement rich-text"
              v-html="$prismic.asHtml(entry.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
            <h3 class="list-headline" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 100}">Involvement</h3>
            <p class="work-types column-list" v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 200}">{{entry.involvement}}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.slices" :key="index" 
      :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>

  </section>
</template>

<script>
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
  asyncData ({ app, params, store }) {
    return app.$prismic.initApi().then(ctx => {
      return ctx.api.getByUID('work_posts', params.slug).then(res => {
        return {
          document: res,
          entry: res.data
        }
      })
    })
  },
  computed: {
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
    this.$store.dispatch('setBackgroundColor', this.entry.background_color)
  },
  mounted () {
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
.add-margin {
  margin-bottom: 200px;
}
.work-highlight-video {
  margin-top: 200px;
}
</style>
