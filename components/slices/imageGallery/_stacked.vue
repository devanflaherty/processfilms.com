<template>
  <article class="slice gallery-stacked section">
    <div class="container">
      <div class="columns is-multiline">
        <article class="column stacked-slide is-6 is-paddingless" v-for="(slide, index) in slides" :key="index">
          <template v-if="slide.slide_caption">
            <captionedImage :img="slide.gallery_image" :caption="slide.slide_caption" />
          </template>
          <template v-else>
            <img v-lazy="slide.gallery_image.url"  :alt="slide.gallery_image.alt">
          </template>
        </article>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slides']
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
  display: block;
}
.stacked-slide {
  .slide-caption {
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
  }
  &:hover {
    .slide-caption {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
