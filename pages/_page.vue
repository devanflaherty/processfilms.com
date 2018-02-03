<template>
  <div 
    id="page" 
    class="page"
    :class="contrast">

    <component :is="template + 'Page'" :page="page"/>
    
  </div>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'
import defaultPage from '~/components/pageTemplates/default'
import rosterPage from '~/components/pageTemplates/roster'
import workPage from '~/components/pageTemplates/work'

export default {
  name: 'page',
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
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
    defaultPage,
    rosterPage,
    workPage
  },
  async asyncData ({ app, params, error, store }) {
    try {
      let page = await store.dispatch('getPage', params.page)
      if (page.data.page_template === 'roster') {
        await store.dispatch('getRoster')
      } else if (page.data.page_template === 'work') {
        await store.dispatch('getWork')
      }
      return {
        document: page,
        page: page.data,
        template: page.data.page_template
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  computed: {
    contrast () {
      return {
        'has-text-black': this.page.page_contrast === 'Dark',
        'has-text-white': this.page.page_contrast === 'Light'
      }
    },
    seoTitle () {
      if (this.page.meta_title > 0) {
        return this.page.meta_title
      } else {
        return this.$prismic.asText(this.page.title)
      }
    },
    seoDesc () {
      if (this.page.meta_description) return this.page.meta_description
      return this.$prismic.asText(this.page.approach)
    },
    seoImage () {
      if (this.page.meta_image) return this.page.meta_image.url
      return this.page.hero_image.large.url
    },
    seoUrl () {
      return 'https://processfilms.com' + this.$route.fullPath
    }
  },
  beforeMount () {
    this.$store.dispatch('setNavColor', this.page.nav_color)
    this.$store.dispatch('setBackgroundColor', this.page.background_color)
  },
  mounted () {
    if (this.document) {
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.page.primary_color, this.page.page_contrast)

      this.$prismic.initApi().then(api => {
        api.toolbar()
      })
    }
  }
}
</script>

<style scoped>
</style>
