<template>
  <article class="slice column-slice section">
    <div class="container">
      <h3 class="is-size-4" v-if="headline">{{$prismic.asText(headline)}}</h3>
      
      <div class="columns is-centered">
        <div class="column" :class="[offset(column.offset), layout(column.layout)]" v-for="(column, index) in slice.items" :key="index">
          <template v-if="column.column_image.url && column.content_body.length > 0">
            <captionedImage :img="column.column_image" :caption="column.content_body"/>
          </template>
         
          <template v-else-if="!column.column_image.url && column.content_body.length > 0">
            <div class="content-body rich-text" v-html="$prismic.asHtml(column.content_body)"></div>
          </template>
          
          <template v-else-if="column.column_image.url && column.content_body.length === 0">
            <img v-lazy="column.column_image.url" v-if="column.column_image.url">
          </template>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      headline: this.slice.primary.section_headline
    }
  },
  methods: {
    layout (layout) {
      return `is-${layout}`
    },
    offset (offset) {
      if (offset) {
        return `is-offset-${offset}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.column-slice {
  h3 {
    margin-bottom: 4rem;
  }
  img {
    width: 100%;
  }
}
</style>