export default function ({ store, route }) {
  store.dispatch('toggleMobileNav', false)
  store.dispatch('toggleNavVis', false)
  store.dispatch('toggleLoading', true)
}
