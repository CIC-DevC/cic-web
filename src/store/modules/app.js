import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')
        : true,
      withoutAnimation: false,
    },
    filterbar: false,
    device: 'desktop',
    language: Cookies.get('language') || 'vi',
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SHOW_FILTERBAR: (state) => {
      state.filterbar = true;
    },
    CLOSE_FILTERBAR: (state) => {
      state.filterbar = false;
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('language', language);
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    showFilterBar({ commit }) {
      commit('SHOW_FILTERBAR');
    },
    closeFilterBar({ commit }) {
      commit('CLOSE_FILTERBAR');
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
};

export default app;
