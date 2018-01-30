<template>
  <main class="main">
    <transition name="fade-in">
      <div v-if="loading" id="loader">
        <img id="loader" src="/images/rings.svg">
      </div>
      <!-- <h1 v-if="loading && $route.name !== 'index'" class="home-loading has-text-white is-size-1">||</h1> -->
    </transition>
    <div id="backgroundTransition" class="background-transition">
      <span class="bgSpan"></span>
    </div>
    <SiteNav />
    <nuxt />
    <SiteFooter v-if="$route.name !== 'contact'"/>
  </main>
</template>

<script>

import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  mixins: [breakpoints]
}
</script>

<style lang="scss">
.home-loading {
  position: fixed;
  height: 60px;
  width: 60px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.wio-link {
  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;
  background: rgba(white, 0.2);
  padding: .5rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}

.background-transition {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  transform: translateZ(0);
  width: 100%;
  z-index: 0;
  span {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    transition: background-color .5s ease-in-out;
  }
}

#loader {
  position: fixed;
  z-index: 500;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0; bottom: 0; right: 0;
  img {
    left: 0; top: 0; bottom: 0; right: 0;
    margin: auto;
    position: absolute;
    width: 60px;
    height: 60px;
  }
  // h1 {
  //   color: black;
  //   font-weight: 800;
  //   span {
  //     font-size: 44px!important;
  //     color: black;
  //     display: inline-block;
  //   }
  //   span:nth-child(1) {
  //     animation: wave-left infinite 2s;
  //   }
  //   span:nth-child(3) {
  //     animation: wave-right infinite 2s;
  //   }
  // }
}
</style>
