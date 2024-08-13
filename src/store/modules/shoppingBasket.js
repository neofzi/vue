export default {
    namespaced: true,
    state: {
        basket: [],
    },
    getters: {
        getBasket: (state) => state.basket,
        getTotalPrice: (state) => {
            return state.basket.reduce((total, product) => {
                return total + product.price
            }, 0)
        },
    },
    mutations: {
        addToBasket(state, product) {
            state.basket.push(product)
            // console.log(state.basket)
        },
        removeFromBasket(state, productId) {
            const index = state.basket.findIndex((item) => item.id === productId)
            if (index !== -1) {
                state.basket.splice(index, 1)
                //  console.log(state.basket)
            }
        },
        updateBasketItem(state, updatedProduct) {
            state.basket = state.basket.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        },
        removeBasketItemByMenuProduct(state, menuProductId) {
            state.basket = state.basket.filter((product) => product.id !== menuProductId)
        },
    },
    actions: {
        addToBasket({ commit }, product) {
            commit('addToBasket', product)
        },
        removeFromBasket({ commit }, productId) {
            commit('removeFromBasket', productId)
        },
        updateBasketItem({ commit }, updatedProduct) {
            commit('updateBasketItem', updatedProduct)
        },
        removeBasketItemByMenuProduct({ commit }, menuProductId) {
            commit('removeBasketItemByMenuProduct', menuProductId)
        },
    },
    modules: {},
}
