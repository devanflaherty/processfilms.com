<template>
<section id="clientLogos" class="section">
  <div class="container">

    <div class="client-welcome columns" v-if="clientsInfo.headline && clientsInfo.statement">
      <div class="column">
        <h3 class="opening-headline has-text-black" 
          v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'left'}">
          {{$prismic.asText(clientsInfo.headline)}}
        </h3>
      </div>
      <div class="column">
        <div class="client-statement has-text-black rich-text" 
          v-html="$prismic.asHtml(clientsInfo.statement)"
          v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom', delay: 200}"></div>
      </div>
    </div>

    <div class="clientLogos__columns columns is-mobile is-multiline is-centered">
      <div ref="logo" class="client-logo column is-4-tablet is-5-mobile"
        v-for="(item, index) in logos" :key="index" >
        <div class="logo-pad">
          <img v-lazy="item.logo.url" :style="`height:${getHeight(item)}px`">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: ['logos', 'clientsInfo'],
  methods: {
    getHeight (item) {
      if (item.height) {
        return item.height
      } else {
        return item.logo.dimensions.height
      }
    }
  },
  mounted () {
    this.$reveal('.client-logo', {duration: 1500}, 150)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
#clientLogos {
  padding-top: 260px;
  .clientLogos__columns {
    padding-top: 100px;
  }
}
.client-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-pad {
    padding: 35px 0;
  }
  img {
    display: block;
    max-width: none;
    @include mobile() {
      max-width: 100%;
    }
  }
}
</style>

