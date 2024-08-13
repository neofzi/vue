import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('users')
export default {
    namespaced: true,
    state: () => ({
        permissions: {},
        loading: false,
        error: null,
        users: [],
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,
        userPermissions: (state) => state.permissions,
        allUsers: (state) => state.users,
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions
        },
        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
        setUsers(state, users) {
            state.users = users
        },
    },
    actions: {
        loadUserPermissions({ commit, rootGetters }, userId) {
            userId ??= rootGetters['bar/someGetter'].getUser.uid
            collectionDB.getItemById(userId).then((permissions) => {
                commit('setPermissions', permissions)
            })
        },
        clearPermissions({ commit }) {
            commit('setPermissions', {})
        },
        loadUsers({ commit }) {
            commit('setLoading', true)
            collectionDB
                .loadItemsList()
                .then((users) => {
                    commit('setUsers', users)
                    commit('setLoading', false)
                })
                .catch((error) => {
                    commit('setError', error)
                    commit('setLoading', false)
                })
        },
    },
}
