import Vue from 'vue'

import videoEmbed from '~/components/slices/videoEmbed'
import highlight from '~/components/slices/highlight'
import imageGallery from '~/components/slices/imageGallery'
import columnedContent from '~/components/slices/columnedContent'
import banner from '~/components/slices/banner'
import richText from '~/components/slices/richText'
import quote from '~/components/slices/quote'

import workCard from '~/components/work/workCard'

import rosterCard from '~/components/roster/rosterCard'

// Utilities
import responsiveVideo from '~/components/utilities/responsiveVideo'
import captionedImage from '~/components/utilities/captionedImage'
import heroLoader from '~/components/utilities/heroLoader'
import blurLoader from '~/components/utilities/blurLoader'
// Link Helper Component
// Using Nuxt Link will resolve to a local route
// So we check if the link from prismic is a Document or URL
// And we return the correct template
import prismicLink from '~/components/utilities/prismicLink'

Vue.component('videoEmbed', videoEmbed)
Vue.component('highlight', highlight)
Vue.component('imageGallery', imageGallery)
Vue.component('columnedContent', columnedContent)
Vue.component('banner', banner)
Vue.component('richText', richText)
Vue.component('quote', quote)

Vue.component('workCard', workCard)
Vue.component('rosterCard', rosterCard)

Vue.component('responsiveVideo', responsiveVideo)
Vue.component('captionedImage', captionedImage)
Vue.component('heroLoader', heroLoader)
Vue.component('blurLoader', blurLoader)
Vue.component('prismicLink', prismicLink)
