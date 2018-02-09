<template>
  <div id="mobileNav" class="mobileNav" :class="{'mobileNav--is-active': mobileNav}">
    <div class="mobileNav__wrap">
      <div class="mobileNav__wrap__mainNav">
        <div class="navbar-item mobile-item" v-for="(link, index) in navigationMenu.menu" :key="index">
          <prismic-link :link="link.link_url">{{link.link_label}}</prismic-link>
        </div>
      </div>

      <div class="mobileNav__wrap__contactWidget">
        <h6>{{$prismic.asText(contactWidget.title)}}</h6>
        <div class="rich-text" v-html="$prismic.asHtml(contactWidget.widget)"></div>
      </div>

      <div class="mobileNav__wrap__connectNav">
        <h6>{{$prismic.asText(connectMenu.title)}}</h6>
        <div class="mobile-item navbar-item" v-for="(link, index) in connectMenu.menu" :key="index">
          <prismic-link :link="link.link_url">{{link.link_label}}</prismic-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import {TimelineMax} from 'gsap'

export default {
  props: ['menu', 'mobileNav'],
  computed: {
    ...mapGetters(['navigationMenu', 'connectMenu', 'contactWidget'])
  },
  watchers: {
    loading () {
      if (this.loading === true) {
        this.$store.dispatch('toggleMobileNav', false)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.mobileNav {
  z-index: 10;
  display: none;
  visibility: hidden;
  text-align: right;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  h6 {
    font-weight: 600;
    color: darken($white, 60%);
  }
  &:before {
    content:'';
    background: $black;
    display: block;
    position: fixed;
    right: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s 0.25s ease;
  }
  &__wrap {
    z-index: 10;
    position: absolute;
    right: -100%;
    margin: auto;
    width: 100%;
    height: auto;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
    top: 140px;
    transition: all 0.5s ease;
    @include mobile () {
      top: 80px;
      padding-left: .5rem;
      padding-right: .5rem;
    }
    &__mainNav {
      margin-bottom: 4rem;
      h6 {
        padding-right: 1rem;
      }
    }
    &__connectNav {
      h6 {
        padding-right: 1.5rem;
      }
      .rich-text {
        a, span {
          font-size: 1rem;
        }
      }
    }
    &__contactWidget {
      margin-bottom: 4rem;
      padding-right: 1.5rem;
      .rich-text {
        a, span {
          font-size: 1rem;
        }
      }
    }
    .navbar-item {
      display: block;
      padding-top: 0;
      padding-bottom: 0;
      a {
        font-size: 1.5rem;
        color: $white;
        background: none!important;
        transition: color 0.5s ease;
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
          color: $white;
          &:after {
            height: 100%;
            background: $white;
          }
        }
      }
    }
  }

  &--is-active {
    visibility: visible;
    
    .mobileNav__wrap, &::before {
      right: 0;
    }
    // Transitions In
    &::before {
      transition: all 0.5s ease;
      box-shadow: -14px 10px 20px rgba(0,0,0,0.6);
    }
    .mobileNav__wrap {
      transition: all 0.33s 0.33s ease;
    }
  }
}
</style>

