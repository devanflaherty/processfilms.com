<template>
  <transition name="fade-in" appear>
    <article class="video-wrapper">
      <iframe :src="`https://player.vimeo.com/video/${id}`" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      <!-- <vimeo-player ref="player" :video-id="id" @ready="onReady"></vimeo-player> -->
    </article>
  </transition>
</template>

<script>
export default {
  name: 'video_player',
  props: ['url', 'color'],
  data () {
    return {
      videoReady: false
    }
  },
  computed: {
    id () {
      const url = this.url
      const urlLength = url.length
      let res = ''
      if (urlLength > 9) {
        const stripL = urlLength - 9
        res = url.substring(stripL, urlLength)
      } else {
        res = this.url
      }

      return res
    }
  },
  methods: {
    onReady () {
      this.videoReady = true
    }
  },
  mounted () {
    if (this.color) {
      this.vColor = this.color
    }
  }
}
</script>

<style lang="scss">
// .fade-in-enter-active, .fade-in-leave-active {
//   transition: all 1s 1s ease!important;
// }
// .fade-in-enter, .fade-in-leave-to  {
//   opacity: 0;
// }
.video-wrapper {
	position: relative;
	padding-bottom: 52.25%;/*56.25%;  16:9 */
	padding-top: 25px;
  height: 0;
  width: 100%;
  overflow: hidden;
  &.wide {
    padding-bottom: 38.25%; /* 16:9 */
  }
}
.video-wrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
#video {
  margin-bottom: 2rem;
}
</style>
