<template>
  <nav class="navbar is-transparent" :style="`background-color: ${navColor}`">
    <style>
      .navbar-item a:after {
        background: {{primaryColor}}!important;
      }
      .nav-burg span {
        background: {{primaryColor}}!important;
      }
    </style>
    <transition name="nav-in" appear>
      <div class="navbar-brand" v-if="navVis">
        <div class="navbar-item" >
          <Logo :animate="navVis" :scrolledLogo="scrolled"/>
        </div>
        <div v-if="breakpoint < 3" class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
          <span :style="`background-color: ${primaryColor}`"></span>
          <span :style="`background-color: ${primaryColor}`"></span>
        </div>
      </div>
    </transition>
    <transition name="nav-in" appear>
      <div id="navMenu" class="navbar-menu" v-if="navVis">
        <div class="navbar-end">
          
          <div v-if="breakpoint >= 3" class="navbar-item" :class="{'navbar-item--is-hidden': mobileNav}" v-for="(link, index) in navigationMenu.menu" :key="index">
            <prismic-link :style="`color: ${primaryColor}`" :link="link.link_url">{{link.link_label}}</prismic-link>
          </div>
          
          <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
            <span :style="`background-color: ${primaryColor}`"></span>
            <span :style="`background-color: ${primaryColor}`"></span>
          </div>

        </div>
      </div>
    </transition>

    <MobileNav :mobileNav="mobileNav"/>
  </nav>
</template>

<script>
import Logo from '~/components/Logo'
import MobileNav from '~/components/MobileNav'

import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    MobileNav
  },
  data () {
    return {
      scrolled: false,
      ticking: false
    }
  },
  computed: {
    ...mapGetters(['navColor', 'mobileNav', 'navigationMenu', 'breakpoint'])
  },
  watch: {
    mobileNav (bool) {
      if (bool) {
        this.disableScroll(true)
      } else {
        this.disableScroll(false)
      }
    },
    breakpoint (newV, oldV) {
      if (newV > oldV && oldV < 3) {
        this.$store.dispatch('toggleMobileNav', false)
        this.disableScroll(false)
      }
    }
  },
  methods: {
    raf () {
      if (!this.ticking) {
        window.requestAnimationFrame(this.scrollAction)
        this.ticking = true
      }
    },
    scrollAction () {
      // let lastScrollTop = 0
      let scrollTop = window.scrollY

      if (scrollTop >= 60) {
        this.scrolled = true
      } else if (scrollTop < 60) {
        this.scrolled = false
      }
      // lastScrollTop = scrollTop
      this.ticking = false
    },
    showMobileNav () {
      this.$store.dispatch('toggleMobileNav', !this.mobileNav)
    },
    disableScroll (bool) {
      if (bool) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = null
        document.getElementsByTagName('body')[0].style.overflow = null
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.raf)
    this.raf()
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.navbar {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 148px;
  background: none;
  padding: 0 2rem;
  transition: background-color 0.5s ease-in-out;
  &.bg-none {
    background: none;
  }
  @include touch() {
    height: 80px;
    padding: .8rem 1rem;
  }
  .navbar-brand {
    position: relative;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    .navbar-item {
      padding: 0;
    }
  }
  .navbar-menu {
    z-index: 90;
    padding-left: 0;
    padding-right: 0;
    .navbar-end {
      align-items: center;
    }
    .navbar-item {
      padding-left: 0;
      padding-right: 0;
      margin: 0 2rem; 
      transition: all 0.5s ease;
      &--is-hidden {
        opacity: 0;
        visibility: hidden;
      }
      a {
        color: $white;
        font-size: 1rem;
        position: relative;
        &:after {
          content: '';
          background: inherit;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          height: 2px;
          width: 0;
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            width: 100%;
          }
        }
      }
    }
  }
}

.nav-burg {
  color: $white;
  padding: 4px;
  height: 8px;
  width: 2rem;
  position: relative;
  z-index: 100;
  float: right;
  flex: 0 1 auto;
  cursor: pointer;
  transition: all 0.5s ease;
  @include desktop () {
    display: none;
  }
  &:hover {
    background: none;
  }
  span {
    cursor: pointer;
    position: absolute;
    display: block;
    content: '';
    transition: background-color .5s ease, top .5s .5s cubic-bezier(.75,0,.50, 1.5), transform .5s cubic-bezier(.75,0,.50, 1.5);

    border-radius: 6px;
    height: 2px;
    width: 1.5rem;
    background: $white;
  }
  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2) {
    top: 100%;
  }
  &.is-active span {
    top: 50%;
    transform-origin: center center;
    background: $white!important;
    transition: background-color .5s ease, top .5s cubic-bezier(.75,0,.50, 1.5), transform .5s .5s cubic-bezier(.75,0,.50, 1.5);
  }
  &.is-active span:nth-child(1) {
    transform: rotate(-45deg);
  }
  &.is-active span:nth-child(2) {
    transform: rotate(45deg);
  }
}

.nav-in-enter-active, .nav-in-leave-active {
  transition: all 0.5s cubic-bezier(.48, 0, .12, 1);
}
.nav-in-enter, .nav-in-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
