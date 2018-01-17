<template>
<main>
  <SiteNav />
  <section class="container push-top">
    <h1 class="title">
      UH OH
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link>
  </section>
  <SiteFooter />
</main>
</template>

<script>
import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'
import {mapGetters} from 'vuex'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  props: ['error'],
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  mixins: [breakpoints],
  computed: {
    ...mapGetters(['loading'])
  },
  created () {
    this.$store.dispatch('getMenus')
  },
  mounted () {
    this.setPageStyle('#000000', 'Dark')
  }
}
</script>

<style scoped>
.push-top {
  padding: 10rem 0;
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
