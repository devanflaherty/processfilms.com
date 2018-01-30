<template>
  <nuxt-link :to="$prismic.asLink(link)" v-if="link.link_type === 'Document'">
    <slot></slot>
  </nuxt-link>
  <a v-else :href="$prismic.asLink(link)">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['link']
}
</script>

