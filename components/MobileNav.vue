<template>
  <div id="mobileNav" :class="{'is-active': mobileNav}">
    <div class="mobile-nav-wrap">
      <div class="main-nav">
        <h6>{{$prismic.asText(navigationMenu.title)}}</h6>
        <nuxt-link class="navbar-item mobile-item" :to="$prismic.asLink(link.link_url)" v-for="(link, index) in navigationMenu.menu" :key="index">
          {{link.link_label}}
        </nuxt-link>
      </div>

      <div class="contact-widget">
        <h6>{{$prismic.asText(contactWidget.title)}}</h6>
        <div class="rich-text" v-html="$prismic.asHtml(contactWidget.widget)"></div>
      </div>

      <div class="connect-nav">
        <h6>{{$prismic.asText(connectMenu.title)}}</h6>
        <div class="mobile-item navbar-item" v-for="(link, index) in connectMenu.menu" :key="index">
          <nuxt-link v-if="link.link_url.link_type === 'Document'" :to="$prismic.asLink(link.link_url)">{{link.link_label}}</nuxt-link>
          <a v-else :href="$prismic.asLink(link.link_url)">{{link.link_label}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {TimelineMax} from 'gsap'

export default {
  props: ['menu', 'mobileNav'],
  computed: {
    ...mapGetters(['navigationMenu', 'connectMenu', 'contactWidget'])
  },
  watch: {
    mobileNav (bool) {
      let tl = new TimelineMax({delay: 0.25})
      if (bool) {
        tl.staggerFromTo('.mobile-item', 1, {
          x: -100,
          autoAlpha: 0,
          rotationY: -90,
          transformStyle: 'preserve-3d',
          perspective: 100
        }, {
          x: 0,
          autoAlpha: 1,
          rotationY: 0
        }, 0.25)
      } else {
        tl.staggerTo('.mobile-item', 0.5, {
          autoAlpha: 0
        }, 0.25)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
#mobileNav {
  z-index: 10;
  display: none;
  visibility: hidden;
  text-align: right;
  h6 {
    font-weight: 600;
    color: darken($white, 60%);
  }
  @include touch(){
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mobile-nav-wrap {
      z-index: 10;
      position: absolute;
      top: 100px; 
      left: -100%;
      margin: auto;
      width: 100%;
      height: 100%;
      padding-left: 4rem;
      padding-right: 4rem;
      @include mobile() {
        padding-left: .5rem;
        padding-right: .5rem;
      }
      .main-nav {
        margin-bottom: 4rem;
        h6 {
          padding-right: 1rem;
        }
      }
      .contact-widget {
        margin-bottom: 4rem;
        padding-right: 1.5rem;
      }
      .connect-nav {
        h6 {
          padding-right: 1.5rem;
        }
      }
      .navbar-item {
        display: block;
        font-size: 1.5rem;
        color: $white;
        background: none!important;
        transition: color 0.5s ease;
        padding-top: 0;
        padding-bottom: 0;
        &:after {
          font-size: 2rem;
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          height: 0px;
          background: transparent;
          width: 2px;
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            height: 100%;
            background: $white;
          }
        }
      }
    }
    &::before {
      content:'';
      display: block;
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
    }
    // Transition timing Out
    .mobile-nav-wrap {
      transition: all 0.5s ease;
    }
    &::before {
      z-index: 8;
      background: $black;
      transition: all 0.5s 0.25s ease;
    }
    &.is-active {
      visibility: visible;
      
      .mobile-nav-wrap, &::before, &::after {
        left: 0;
      }
      // Transitions In
      &::before {
        transition: all 0.33s 0.25s ease;
      }
      .mobile-nav-wrap {
        transition: all 0.33s 0.33s ease;
      }
    }
  }
}
</style>

