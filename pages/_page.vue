<template>
  <section 
    :data-wio-id="document.id" 
    id="page" 
    class="page section push-top" 
    :class="contrast"
    v-show="!loading">

    <div class="container page-wrap">
      <div class="page-welcome columns">
        <div class="column">
          <div class="opening-headline"
            v-html="$prismic.asHtml(page.opening_headline)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        <div class="column">
          <div class="opening-statement rich-text"
            v-html="$prismic.asHtml(page.opening_statement)"
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
        </div>
      </div>
    </div>
    {{page.content.text}}
    <div class="container" v-if="page.content.text">
      <div class="rich-text"
        v-html="$prismic.asHtml(page.content)"
        v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
    </div>
    
    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in page.slices" :key="index" 
      :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>
    
  </section>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

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
  // validate ({ params, store }) {
  // Check if `params.id` is an existing category
  //   return store.state.categories.some((category) => category.id === params.id)
  // }
  asyncData ({ app, params, error }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('pages', params.page).then((res) => {
        return {
          document: res,
          page: res.data
        }
      })
    }).catch(err => {
      console.error(err)
      if (err) {
        error({statusCode: 404, message: 'The page you are looking for does not exist.'})
      }
    })
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
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
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
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
