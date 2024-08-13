export default {
    namespaced: true,
    state: {
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    },
    getters: {
        getFavorites: (state) => state.favorites,
    },
    mutations: {
        addToFavorites(state, product) {
            state.favorites.push(product)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
            // console.log(state.favorites)
        },
        removeFromFavorites(state, productId) {
            state.favorites = state.favorites.filter((product) => product.id !== productId)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        updateFavorite(state, updatedProduct) {
            const index = state.favorites.findIndex((product) => product.id === updatedProduct.id)
            if (index !== -1) {
                state.favorites.splice(index, 1, updatedProduct)
                localStorage.setItem('favorites', JSON.stringify(state.favorites))
            }
        },
        removeFavoriteByMenuProduct(state, menuProductId) {
            state.favorites = state.favorites.filter((product) => product.id !== menuProductId)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
    },
    actions: {
        addToFavorites({ commit }, product) {
            commit('addToFavorites', product)
        },
        removeFromFavorites({ commit }, productId) {
            commit('removeFromFavorites', productId)
        },
        updateFavorite({ commit }, updatedProduct) {
            commit('updateFavorite', updatedProduct)
        },
        removeFavoriteByMenuProduct({ commit }, menuProductId) {
            commit('removeFavoriteByMenuProduct', menuProductId)
        },
    },
    modules: {},
}
//(state, getters, rootState, rootGetters)
