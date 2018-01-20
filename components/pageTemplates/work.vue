<template>
  <section id="featuredWork" class="page push-top">
    <div class="work-cards">
      <workCard v-for="(post, index) in work.results" :key="index" :post="post"/>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ['page'],
  computed: {
    ...mapGetters(['work'])
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.work-cards {
  @include mobile () {
    padding: 0;
    margin: 0;
    .container {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
