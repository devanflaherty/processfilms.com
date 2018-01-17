<template>
<div class="is-overlay hero-image" :class="{'work-hero-image': $route.name == 'work-slug'}">
  <transition name='fade-in' appear>
    <div v-if="$route.name == 'work-slug'" class="placeholder-thumb is-overlay" 
      :style="`background-image: url(${this.heroImage.placeholder.url})`">
    </div>
  </transition>

  <transition name='fade-in' appear>
    <div v-if="loaded" class="master-image is-overlay" :class="{'loaded': loaded}"
      :style="`background-image: url(${hero})`">
    </div>
  </transition>

  <transition name='fade-in' v-if="$route.name == 'work-slug'">
    <div v-if="loaded" class="hero-fade" :style="`box-shadow: inset 0 -80px 50px -40px ${backgroundColor}`"></div>
  </transition>
</div>
</template>

<script>
export default {
  props: ['hero-image'],
  data () {
    return {
      hero: this.heroImage.placeholder.url,
      thumbLoaded: true,
      loaded: false
    }
  },
  methods: {
    setMain () {
      return new Promise((resolve, reject) => {
        let imgMain = new Image()
        imgMain.onload = () => {
          resolve(this.heroImage.large.url)
        }
        imgMain.onerror = reject

        imgMain.src = this.heroImage.large.url
        return true
      })
    }
  },
  mounted () {
    this.setMain().then((res) => {
      this.thumbLoaded = false
      this.loaded = true
      this.hero = res

      setTimeout(() => {
        this.$emit('heroAvailable')
      }, 500)
    })
  }
}
</script>

<style lang="scss" scoped>
.hero-image {
  overflow: hidden;
}
.hero-fade {
  z-index: 5;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 25vh;
  width: 100%;
  box-shadow: inset 0 -80px 50px -40px rgba(0, 0, 0, 1);
}

.master-image {
  background-size: cover;
  background-position: center;
}
.placeholder-thumb {
  filter: blur(50px);
  background-position: center;
  background-size: cover;
  transform: scale(1.2)
}
</style>
