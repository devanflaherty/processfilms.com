<template>
  <div class="page-default push-top">
    <section class="section">
      <div class="container page-wrap" v-if="page.page_headline[0].text">
        <div class="page-welcome columns">
          <div class="column">
            <div class="opening-headline"
              v-html="$prismic.asHtml(page.page_headline)"
              v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
          </div>
          <div class="column">
            <div class="opening-statement rich-text"
              v-html="$prismic.asHtml(page.page_statement)"
              v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
          </div>
        </div>
      </div>

      <div class="container" v-if="page.content.length > 0">
        <div class="rich-text"
          v-html="$prismic.asHtml(page.content)"
          v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
      </div>
    </section>
    <section class="section">
      <!-- Repeatable Slices -->
      <component v-for="(slice, index) in page.slices" :key="index" 
        :slice="slice"  :is="toCamelCase(slice.slice_type)"></component>
    </section>
  </div>
</template>

<script>
export default {
  name: 'default',
  props: ['page'],
  computed: {
    contrast () {
      return {
        'has-text-black': this.page.page_contrast === 'Dark',
        'has-text-white': this.page.page_contrast === 'Light'
      }
    }
  }
}
</script>

<style scoped>
</style>
