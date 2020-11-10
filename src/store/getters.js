const getters = {
  sidebar: (state) => state.app.sidebar,
  filterbar: (state) => state.app.filterbar,
  language: (state) => state.app.language,
  device: (state) => state.app.device,
  userId: (state) => state.user.id,
  token: (state) => state.user.token,
  user: (state) => state.user.user,
  roles: (state) => state.user.roles,
  routers: (state) => state.permission.routers,
};
export default getters;
