import DbOperations from '../helpers/DbOperations'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const collectionDB = new DbOperations('menu')
export default {
    namespaced: true,
    state: () => ({
        menuList: [],
        loading: false,
        error: null,
        imageUrl: '',
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,
        getItemsList: (state) => state.menuList,
        getItemById: (state) => (itemId) => state.menuList.find((item) => item.id == itemId),
        getProductsByCategory: (state) => (categoryProduct) => {
            if (!categoryProduct) return state.menuList
            return state.menuList.filter((item) => item.category === categoryProduct)
        },
        getImageUrl: (state) => state.imageUrl,
    },
    mutations: {
        setItemsList(state, itemsList) {
            state.menuList = itemsList
        },
        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
        setImageUrl(state, url) {
            state.imageUrl = url
        },
    },
    actions: {
        async loadImage({ dispatch }, file) {
            try {
                const storage = getStorage()
                const metadata = {
                    contentType: file.type,
                }
                const storageRef = ref(storage, `menu/${file.name}`)
                const snapshot = await uploadBytes(storageRef, file, metadata)
                const downloadURL = await getDownloadURL(snapshot.ref)
                dispatch('loadImageUrl', downloadURL)
                return downloadURL
            } catch (error) {
                console.error('Error uploading file:', error)
                throw error
            }
        },
        loadImageUrl({ commit }, url) {
            commit('setImageUrl', url)
        },
        loadList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addItem({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteItem({ commit, dispatch }, itemId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(itemId)
                .then(() => {
                    dispatch('loadList')
                    dispatch('favorite/removeFavoriteByMenuProduct', itemId, { root: true })
                    dispatch('shoppingBasket/removeBasketItemByMenuProduct', itemId, { root: true })
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateItem({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    dispatch('loadList')
                    dispatch('favorite/updateFavorite', { id: itemId, ...data }, { root: true })
                    dispatch('shoppingBasket/updateBasketItem', { id: itemId, ...data }, { root: true })
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        loadFilteredData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
    },
}
