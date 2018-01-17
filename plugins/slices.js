import Vue from 'vue'

import videoEmbed from '~/components/slices/videoEmbed'
import highlight from '~/components/slices/highlight'
import imageGallery from '~/components/slices/imageGallery'
import columnedContent from '~/components/slices/columnedContent'
import banner from '~/components/slices/banner'
import richText from '~/components/slices/richText'
import quote from '~/components/slices/quote'

import workCard from '~/components/work/workCard'

import teamCard from '~/components/team/teamCard'

// Utilities
import responsiveVideo from '~/components/utilities/responsiveVideo'
import captionedImage from '~/components/utilities/captionedImage'
import heroLoader from '~/components/utilities/heroLoader'
import blurLoader from '~/components/utilities/blurLoader'

Vue.component('videoEmbed', videoEmbed)
Vue.component('highlight', highlight)
Vue.component('imageGallery', imageGallery)
Vue.component('columnedContent', columnedContent)
Vue.component('banner', banner)
Vue.component('richText', richText)
Vue.component('quote', quote)

Vue.component('workCard', workCard)
Vue.component('teamCard', teamCard)

Vue.component('responsiveVideo', responsiveVideo)
Vue.component('captionedImage', captionedImage)
Vue.component('heroLoader', heroLoader)
Vue.component('blurLoader', blurLoader)
