<template>
  <section id="featuredWork" class="page push-top" v-show="!loading">
    <div class="section">
      <div class="container">
        <div class="work-welcome page-welcome columns">
          <div class="column">
            <div class="opening-headline"
              v-html="$prismic.asHtml(workPage.opening_headline)"
              v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
          </div>
          <div class="column">
            <div class="opening-statement rich-text" 
              v-html="$prismic.asHtml(workPage.opening_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="section work-cards">
      <div class="container">
        <workCard v-for="(post, index) in workPosts" :key="index" :post="post"/>
      </div>
    </div>
  </section>
</template>

<script>
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  head () {
    return {
      title: 'Work'
    }
  },
  async asyncData ({ params, app, store }) {
    let [workPosts, workPage] = await Promise.all([
      app.$prismic.initApi().then((ctx) => {
        return ctx.api.query(
          app.$prismic.predicates.at('document.type', 'work_posts'),
          { orderings: '[my.work_posts.post_position, my.work_posts.title]' }
        )
      }), app.$prismic.initApi().then((ctx) => {
        return ctx.api.getByUID('pages', 'work')
      })
    ])
    return {
      workPosts: workPosts.results,
      workPage: workPage.data
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
  computed: {
    contrast () {
      return {
        'has-text-black': this.workPage.page_contrast === 'Dark',
        'has-text-white': this.workPage.page_contrast === 'Light'
      }
    }
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
  },
  beforeMount () {
    this.$store.dispatch('setBackgroundColor', this.workPage.background_color)
  },
  mounted () {
    if (this.workPosts) {
      this.setHeroUiContrast()
      this.$store.dispatch('toggleNavVis', true)
      this.$store.dispatch('toggleLoading', false)
      this.setPageStyle(this.workPage.primary_color, this.workPage.page_contrast)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

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
</style>
