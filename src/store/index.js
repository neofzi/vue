import { createStore } from 'vuex'
import auth from './modules/auth'
import menu from './modules/menu'
import favorite from './modules/favorite'
import shoppingBasket from './modules/shoppingBasket'
import users from './modules/users'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        menu,
        favorite,
        shoppingBasket,
        users,
    },
})
