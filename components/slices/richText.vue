<template>
  <article class="slice text-slice section">
    <div class="container">
      <div class="rich-text" v-html="$prismic.asHtml(slice.primary.text)"></div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice']
}
</script>
