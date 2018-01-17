import PrismicDOM from 'prismic-dom'
let Elements = PrismicDOM.RichText.Elements

export default {
  apiEndpoint: 'https://processcreative.prismic.io/api/v2',
  accessToken: 'MC5XZk9tcGlvQUFKMVlJTXlo.JBfvv73vv73vv73vv70r77-977-977-9X--_vWvvv70uIzFp77-977-977-9VO-_vXpFOu-_vTVJQgRe',

  linkResolver (doc) {
    // Define the url depending on the document type
    if (doc.type === 'work_posts') {
      return '/work/' + doc.uid
    } else if (doc.type === 'roster_posts') {
      return '/roster/' + doc.uid
    } else if (doc.type === 'pages') {
      return '/' + doc.uid
    }
    // Default to homepage
    return '/'
  },
  htmlSerializer (element, content, children) {
    switch (element.type) {
      // Don't wrap images in a <p> tag
      case Elements.image:
        return '<img src="' + element.url + '" alt="' + element.alt + '">'
      // Add a class to hyperlinks
      case Elements.embed:
        return (`
          <div class="responsive-video" style="padding: 56.25% 0 0 0"
            data-oembed="${element.oembed.embed_url}"
            data-oembed-type="${element.oembed.type}"
            data-oembed-provider="${element.oembed.provider_name}"
          >
            <style>
              iframe { height: 100%; left: 0; position: absolute; top: 0; width: 100%;" }
            </style>
            ${element.oembed.html}
          </div>
        `)
      // Return null to stick with the default behavior
      default: return null
    }
  }
}
