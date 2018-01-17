<template>
  <article class="slice quote-slice section">
    <div class="container">
      <blockquote :style="`border-color: ${primaryColor}`">
        <div class="quote" v-html="$prismic.asHtml(slice.primary.quote)"></div>
        <div class="author" v-html="$prismic.asHtml(slice.primary.name_of_the_author)"></div>
      </blockquote>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice']
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
blockquote {
  border-left: 4px solid $black;
  padding-left: 2rem;
  margin: 2rem 0;
  .quote p {
    font-size: 2.5rem;
    font-weight: $mediumW;
    letter-spacing: -.5px;
    line-height: 1;
  }
  .author p {
    font-weight: $lightW;
    &:before {
      content: '- ';
    }
  }
}
</style>

