<template>
  <article class="slice highlight-slice section">
    <div class="container">
      <div class="columns">
        <template v-if="highlight.highlight_placement == 'Right'">
          <div class="column highlight-body">
            <div class="highlight-content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
          </div>
        </template>

        <div class="column is-6">
          <div class="highlight-media">
            <template v-if="highlight.highlight_embed.html">
              <responsiveVideo :embed="highlight.highlight_embed" />
            </template>
            <template v-else>
              <captionedImage :img="highlight.highlight_thumbnail" :caption="highlight.highlight_caption" />
            </template>
          </div>
        </div>
      
        <template v-if="highlight.highlight_placement == 'Left'">
          <div class="column highlight-body">
            <div class="highlight-content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
          </div>
        </template>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      highlight: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.highlight-body {
  display: flex;
  align-items: center;
  justify-content: center;
  .highlight-content {
    padding: 4rem;
    @include mobile() {
      padding: 0rem;
    }
  }
}
.highlight-media {
  position: relative;
  overflow: hidden;
}
</style>
