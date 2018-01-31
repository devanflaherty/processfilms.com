import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      primaryColor: '#000',
      backgroundColor: '#fff',
      navColor: 'none',
      loading: true,
      navVis: false,
      mobileNav: false,
      breakpoint: 0,
      navigationMenu: {
        title: null,
        menu: null
      },
      connectMenu: {
        title: null,
        menu: null
      },
      contactWidget: {
        title: null,
        widget: null
      },
      roster: {},
      work: {}
    },
    getters: {
      primaryColor: state => {
        return state.primaryColor
      },
      backgroundColor: state => {
        return state.backgroundColor
      },
      navColor: state => {
        return state.navColor
      },
      loading: state => {
        return state.loading
      },
      navVis: state => {
        return state.navVis
      },
      mobileNav: state => {
        return state.mobileNav
      },
      breakpoint: state => {
        return state.breakpoint
      },
      navigationMenu: state => {
        return state.navigationMenu
      },
      connectMenu: state => {
        return state.connectMenu
      },
      contactWidget: state => {
        return state.contactWidget
      },
      roster: state => {
        return state.roster
      },
      work: state => {
        return state.work
      }
    },
    mutations: {
      SET_PRIMARY_COLOR (state, color) {
        state.primaryColor = color
      },
      SET_BACKGROUND_COLOR (state, color) {
        state.backgroundColor = color
      },
      SET_NAV_COLOR (state, color) {
        state.navColor = color
      },
      TOGGLE_LOADING (state, bool) {
        state.loading = bool
      },
      TOGGLE_NAV_VIS (state, bool) {
        state.navVis = bool
      },
      TOGGLE_MOBILE_NAV (state, bool) {
        state.mobileNav = bool
      },
      CHANGE_BREAKPOINT (state, bp) {
        state.breakpoint = bp
      },
      SET_NAVIGATION_MENU (state, obj) {
        state.navigationMenu = obj
      },
      SET_CONNECT_MENU (state, obj) {
        state.connectMenu = obj
      },
      SET_CONTACT_WIDGET (state, obj) {
        state.contactWidget = obj
      },
      SET_ROSTER (state, obj) {
        state.roster = obj
      },
      SET_WORK (state, obj) {
        state.work = obj
      }
    },
    actions: {
      async setCtx (context) {
        let ctx = await this.$prismic.initApi()
        return ctx
      },
      async getPage (context, page) {
        let ctx = await context.dispatch('setCtx')
        return ctx.api.getByUID('pages', page)
      },
      setPrimaryColor (context, color) {
        context.commit('SET_PRIMARY_COLOR', color)
      },
      setBackgroundColor (context, color) {
        context.commit('SET_BACKGROUND_COLOR', color)
        let el = document.querySelector('.bgSpan')

        let updateBg = () => {
          el.style.backgroundColor = color
        }
        window.requestAnimationFrame(updateBg)
      },
      setNavColor (context, color) {
        context.commit('SET_NAV_COLOR', color)
        let el = document.querySelector('.navbar')

        let updateBg = () => {
          el.style.backgroundColor = color
        }
        window.requestAnimationFrame(updateBg)
      },
      toggleLoading (context, bool) {
        context.commit('TOGGLE_LOADING', bool)
      },
      toggleNavVis (context, bool) {
        if (bool) {
          setTimeout(() => {
            context.commit('TOGGLE_NAV_VIS', bool)
          }, 350)
        } else {
          context.commit('TOGGLE_NAV_VIS', bool)
        }
      },
      toggleMobileNav (context, bool) {
        context.commit('TOGGLE_MOBILE_NAV', bool)
      },
      changeBreakpoint (context, bp) {
        context.commit('CHANGE_BREAKPOINT', bp)
      },
      async getHome (context) {
        let ctx = await context.dispatch('setCtx')
        let home = await ctx.api.getSingle('home', {'fetchLinks': ['work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color']})
        return home
      },
      async getMenus (context) {
        let ctx = await context.dispatch('setCtx')
        let menu = await ctx.api.getSingle('menu')

        let mainMenu = {
          title: menu.data.main_menu_title,
          menu: menu.data.navigation_menu
        }
        let connectMenu = {
          title: menu.data.connect_menu_title,
          menu: menu.data.connect_menu
        }
        let contactWidget = {
          title: menu.data.widget_title,
          widget: menu.data.contact_widget
        }
        context.commit('SET_NAVIGATION_MENU', mainMenu)
        context.commit('SET_CONNECT_MENU', connectMenu)
        context.commit('SET_CONTACT_WIDGET', contactWidget)
      },
      async getRoster (context) {
        let ctx = await context.dispatch('setCtx')
        let roster = await ctx.api.query(
          this.$prismic.predicates.at('document.type', 'roster_posts'),
          {
            orderings: '[my.roster_posts.post_position, my.roster_posts.title]',
            fetch: ['roster_posts.member_name', 'roster_posts.member_position']
          }
        )

        context.commit('SET_ROSTER', roster)
        return roster
      },
      async getRosterMember (context, memberUid) {
        let ctx = await context.dispatch('setCtx')
        let member = await ctx.api.getByUID('roster_posts', memberUid, {'fetchLinks': ['work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color']})
        return member
      },
      async getWork (context) {
        let ctx = await context.dispatch('setCtx')
        let work = await ctx.api.query(
          this.$prismic.predicates.at('document.type', 'work_posts'),
          { orderings: '[my.work_posts.post_position, my.work_posts.title]' }
        )

        context.commit('SET_WORK', work)
      },
      async getWorkPost (context, slug) {
        let ctx = await context.dispatch('setCtx')
        let entry = await ctx.api.getByUID('work_posts', slug)
        return entry
      },
      async nuxtServerInit ({dispatch}) {
        await dispatch('getMenus')
      }
    }
  })
}

export default createStore
