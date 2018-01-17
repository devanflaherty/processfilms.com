<template>
  <article class="slice embed-slice section">
    <div class="container">
      <responsiveVideo 
        v-if="embed.embed_link.html"
        :embed="embed.embed_link" 
        v-scroll-reveal="{duration: 1000, scale: 0.9, distance: '200px'}"/>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      embed: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
</style>
