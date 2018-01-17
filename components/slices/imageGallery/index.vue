<template>
  <component :slides="items" :is="gallery.gallery_style" />
</template>

<script>
import Stacked from '~/components/slices/imageGallery/_stacked'
import Slider from '~/components/slices/imageGallery/_slider'

export default {
  components: {
    Stacked,
    Slider
  },
  props: ['slice'],
  data () {
    return {
      gallery: this.slice.primary,
      items: this.slice.items
    }
  }
}
</script>