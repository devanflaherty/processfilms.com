<template>
  <section id="featuredWork" class="page push-top">
    <div class="work-cards columns is-paddingless is-marginless is-multiline">
      <workCard class="column is-4-desktop is-6-tablet is-12-mobile is-paddingless is-marginless" v-for="(post, index) in work.results" :key="index" :post="post"/>
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
