importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "wearesamson.com",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.42bae09dc449c47ab00c.js",
    "revision": "ae17c338d188dfbafc44c047d4807822"
  },
  {
    "url": "/_nuxt/layouts/default.c9f094ee7f28a6e5bff9.js",
    "revision": "1d259ddd1bf118fc6c0ad6b5edff05dc"
  },
  {
    "url": "/_nuxt/manifest.84b6406d3f4d3db8df5a.js",
    "revision": "a34935469fb579ee0a0be5a908fce3d4"
  },
  {
    "url": "/_nuxt/pages/_page.9e46763a4f04ed99e8dc.js",
    "revision": "db3c3d58ee70a2523e51cd3d39d53262"
  },
  {
    "url": "/_nuxt/pages/about.9794ac0617c276ee740c.js",
    "revision": "8e5a4e1910f7e58c0f6a3e9cb63f540b"
  },
  {
    "url": "/_nuxt/pages/contact.0f73a59ba12991a18947.js",
    "revision": "ff2c7b3bf85e68bbe8e2aac8d35b86e2"
  },
  {
    "url": "/_nuxt/pages/index.4635f163053e38050128.js",
    "revision": "fcf89b884ea75ad230414a0e2e867a1b"
  },
  {
    "url": "/_nuxt/pages/preview.d27a5264ba36341d6fdd.js",
    "revision": "2de87f49ed2f7545a4a0e81f4958f63d"
  },
  {
    "url": "/_nuxt/pages/team/_member.614c1209f177ae2f2779.js",
    "revision": "3a994e036aaf0ca6b3eeecac5e0cf4ce"
  },
  {
    "url": "/_nuxt/pages/work/_slug.2eefe74edfe3d44e1f1a.js",
    "revision": "daa63b9bfcd9332200707a6378c47360"
  },
  {
    "url": "/_nuxt/pages/work/index.1099f141ea3208b8c223.js",
    "revision": "ef8ee30c1c03df0f2b95f57812dc395d"
  },
  {
    "url": "/_nuxt/vendor.c0ac52cdbe1efdf49d01.js",
    "revision": "59abd2ba16383050c09d28e6e042dcf4"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

