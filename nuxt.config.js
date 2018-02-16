const path = require('path')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')

let url = 'https://processcreative.tv'
let title = 'Process Creative'
let desc = 'We are an agency rooted in film production. Our in-house team of directors, designers and producers is equipped to serve individuals, agencies and brands with creative solutions.'
let unfurl = `${url}/unfurl.jpg`
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Process Creative',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'robots', content: 'all' },
      { hid: 'description', name: 'description', content: desc },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: unfurl },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: desc },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:domain', name: 'twitter:domain', value: url },
      { hid: 'twitter:title', name: 'twitter:title', value: title },
      { hid: 'twitter:description', name: 'twitter:description', value: desc },
      { hid: 'twitter:image', name: 'twitter:image', content: unfurl },
      { hid: 'twitter:url', name: 'twitter:url', value: url }
    ],
    link: [
      { hid: 'image_src', rel: 'image_src', href: unfurl }
    ],
    script: [
      {
        src: 'https://fast.wistia.com/assets/external/E-v1.js',
        async: true
      },
      { 
        defer: true,
        src: 'https://use.fontawesome.com/releases/v5.0.0/js/all.js'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/styles/main.scss', lang: 'scss' }
  ],
  loading: { color: '#484848', height: '6px' },
  /*
  ** Add modules
  */
  modules: [
    '@nuxtjs/pwa'
    // '@nuxtjs/font-awesome'
    // ['@nuxtjs/google-analytics', { ua: 'UA-108368424-1' }]
  ],
  plugins: [
    { src: `~plugins/vue-lazyload`, ssr: false },
    { src: `~plugins/vue-scroll-reveal`, ssr: false },
    { src: `~plugins/vue-swiper`, ssr: false },
    { src: `~mixins/utilities` },
    { src: `~plugins/slices` },
    { src: `~plugins/prismic` },
    { src: `~plugins/waypoints`, ssr: false }
  ],
  router: {
    middleware: ['toggleMobileNav']
  },
  build: {
    // Load plugins in build
    // analyze: true,
    vendor: ['axios', 'vue-lazyload', 'scrollreveal'],
    extend (config, ctx) {
      config.resolve.alias['TweenLite'] = path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js')
      config.resolve.alias['TweenMax'] = path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js')
      config.resolve.alias['TimelineLite'] = path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js')
      config.resolve.alias['TimelineMax'] = path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js')
      config.resolve.alias['ScrollMagic'] = path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js')
      config.resolve.alias['animation.gsap'] = path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
      config.resolve.alias['debug.addIndicators'] = path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      config.resolve.alias['ScrollToPlugin'] = path.resolve('node_modules', 'gsap/ScrollToPlugin.js')

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.js$/,
        exclude: [/(node_modules|bower_components)(?![/|\\](swiper))/], 
      })
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}
