<template>
<footer class="section" v-show="navigationMenu">
  <div class="footer-wrap">
    <div class="container">
      <div class="columns is-mobile is-multiline">
        
        <div class="column is-6-touch is-2-desktop footer-column">
          <h5><strong>Navigation</strong></h5>
          <ul>
            <li v-for="(link, index) in navigationMenu" :key="index">
              <nuxt-link v-if="link.link_url.link_type === 'Document'" :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
              <a v-else :href="$prismic.asLink(link.link_url)">{{link.link_label}}</a>
            </li>
          </ul>
        </div>

        <div class="column is-6-touch is-2-desktop footer-column">
          <h5><strong>Connect</strong></h5>
          <ul>
            <li v-for="(link, index) in connectMenu" :key="index">
              <nuxt-link v-if="link.link_url.link_type === 'Document'" :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
              <a v-else :href="$prismic.asLink(link.link_url)">{{link.link_label}}</a>
            </li>
          </ul>
        </div>

        <div class="new-business column is-12-touch is-5-desktop is-offset-3-desktop footer-column">
          <h5><strong>New Business</strong></h5>
          <div v-html="$prismic.asHtml(contact.newBusiness)"></div>
        </div>
      </div>
    </div>

    <div id="copyright" class="container">
      <p>&copy; 2018 Process Films.<br class="is-hidden-tablet"> All Rights Reserved.</p>
    </div>
  </div>
</footer>
</template>

<script>
import {mapGetters} from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters(['navigationMenu', 'connectMenu', 'contact'])
  },
  mounted () {
    this.$reveal('.footer-column', {distance: '-100px', scale: 1, duration: 1000, reset: true}, 250)
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';

footer {
  min-height: 500px;
  // background: $black;
  overflow: hidden;
  .footer-wrap {
    padding-bottom: 6rem;
    padding-top: 6rem;
  }
  h5 {
    margin-bottom: 1.25rem;
  }
  ul {
    li {
      a {
        color: $white;
        font-size: 1.5rem;
      }
    }
  }
  .new-business {
    @include mobile() {
      margin-top: 2rem;
    }
    p {
      color: $white;
      font-size: 1.5rem;
    }
  }
}

#copyright {
  padding-top: 10rem;

  p {
    color: $grey!important;
    font-size: 1rem;
    @include mobile() {
      font-size: 1rem;
    }
  }
}
</style>


