const pbCtrl = {
  state: {
    shop: {
      name: '宝岛',
      id: '12'
    },
    drawerVisibility: false,
    menuList:[]
  },
  mutations:{
    RELOAD_MENU (state,val) {
      console.log(val)
      state.menuList= val.menuList
      console.log(state)

    },
    CHANGE_SHOP (state,val) {
      state.shop = Object.assign(state.shop,val)
    },
    SET_DRAWER(state,val) {
      state.drawerVisibility = !state.drawerVisibility
    },
    SET_MENU (state,val) {
      state.menuList = val
    }
  }
}
export default pbCtrl
