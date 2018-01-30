<template>
  <article class="column is-6 roster-card is-paddingless" 
    @click="clicked"
    v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', delay: 250}"
    :data-wio-id="post.id">
    <div class="card-square" :class="{'active' : active}">
      <nuxt-link :to="`/roster/${post.uid}`">
        <!-- quick info overlay : reveal on hover -->
        <div class="is-overlay">
          <div class="member-info" v-scroll-reveal="{duration: 1000, scale: 1, origin: 'left', distance: '100px', delay: 250}">
            <span class="is-director" :style="`border-color: ${entry.primary_color};`" v-if="post.tags.find(tag => tag === 'Director')">View Films</span>
            <h3 class="position">
              {{$prismic.asText(entry.member_name)}}
            </h3>
            <h4>{{entry.member_position}}</h4>
          </div>
        </div>

        <div class="image-loader" ref="imageLoader">
          <div class="slice-wrap">
            <div class="image-slice--full image-slice" :style="`background-image: url(${entry.member_avatar.large.url})`"></div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  props: ['post', 'index'],
  data () {
    return {
      active: false,
      entry: this.post.data
    }
  },
  methods: {
    clicked () {
      this.active = true
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.roster-card {
  position: relative;
  overflow: hidden;
  .card-square {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    transition: filter 0.5s ease;
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;
    overflow: hidden;
    .is-overlay {
      z-index: 10;
      display: flex;
      align-items: flex-end;
      .member-info {
        width: 100%;
        padding: 3rem;
        .is-director {
          font-size: .75rem;
          color: $white;
          position: absolute;
          bottom: 3rem;
          right: 3rem;
          border-bottom: 1px solid $white;
        }
        h3 {
          font-size: 1rem;
          color: $white;
        }
        h4 {
          font-size: .75rem;
          color: $white;
        }
      }
    }
    .image-loader {
      transition: all 15s ease;
    }
    img {
      display: block;
      transition: all 15s ease;
      @include mobile() {
        object-fit: cover;
        height: 100%;
        width: auto;
        position: absolute;
      }
    }
  }
  &:hover {
    .image-loader {
      transform: scale(1.3);
    }
  }
  &.reveal {
    .wipe {
      top: -100%;
    }
  }

  .image-loader {
    display: flex;
    @include overlay();
    overflow: hidden;
    .slice-wrap {
      flex: 1 0 auto;
      overflow: hidden;
      position: relative;
      .image-slice {
        position: absolute;
        top: 0;
        height: 100%;
        width: 200%;
        background-size: cover;
        background-position: center;
        left: 0;
        opacity: 0;
        &--full {
          width: 100%;
          opacity: 1;
        }
      }
      &:nth-child(1) .image-slice {
        left: 0;
      }
      &:nth-child(2) .image-slice {
        left: -100%;
      }
      &:nth-child(3) .image-slice {
        left: -200%;
      }
    }
  }
}
</style>
