import { auth } from '@/firebase-config.js'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth'

export default {
    namespaced: true,
    state: {
        user: null,
        loading: false,
        error: null,
    },
    getters: {
        getUser: (state) => state.user,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        async saveLoginUserData({ commit, dispatch }, loginResult) {
            const user = loginResult?.user
            commit('setUser', user)
            //user.displayName - ім'я акаунту
            //user.photoURL - аватар акаунту
            //user.email - електронна адреса акаунту

            // Save user UID in localStorage for session persistence
            localStorage.setItem('userUID', user.uid)

            dispatch('users/loadUserPermissions', user.uid, { root: true })
        },
        loginWithGoogle({ commit, dispatch }) {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
                .then((loginResult) => {
                    dispatch('saveLoginUserData', loginResult)
                })
                .catch((error) => {
                    commit('setError', error)
                })
        },
        async loginWithCredential({ commit, dispatch }) {
            const userUID = localStorage.getItem('userUID')
            if (userUID) {
                onAuthStateChanged(auth, (user) => {
                    if (user && user.uid === userUID) dispatch('saveLoginUserData', { user })
                    else {
                        // User not authenticated
                        commit('setUser', null)
                    }
                })
            } else commit('setUser', null)
        },
        logout({ commit, dispatch }) {
            signOut(auth)
                .then(() => {
                    localStorage.removeItem('userUID')
                    commit('setUser', null)
                    dispatch('users/clearPermissions', null, { root: true })
                })
                .catch((error) => {
                    commit('setError', error)
                })
        },
        async createUser({ commit, dispatch }, userInfo) {
            try {
                const { email, password, firstName, lastName } = userInfo
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const userToUpdate = auth.currentUser

                await updateProfile(userToUpdate, {
                    displayName: `${firstName} ${lastName}`,
                })

                dispatch('saveLoginUserData', userCredential)
                return userCredential
            } catch (error) {
                commit('setError', error, { root: true })
                throw error
            }
        },
        async signInUser({ commit, dispatch }, { email, password }) {
            try {
                const loginResult = await signInWithEmailAndPassword(auth, email, password)
                dispatch('saveLoginUserData', loginResult)
                return loginResult
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
    },
}

//========================================================================================================================================================

// import { auth } from '@/firebase-config.js'
// import {
//     GoogleAuthProvider,
//     signInWithPopup,
//     signInWithCredential,
//     signOut,
//     updateProfile,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
// } from 'firebase/auth'

// export default {
//     namespaced: true,
//     state: {
//         user: null,
//         loading: false,
//         error: null,
//     },
//     getters: {
//         getUser: (state) => state.user,
//     },
//     mutations: {
//         setUser(state, user) {
//             state.user = user
//         },
//         setLoading(state, loading) {
//             state.loading = loading
//         },
//         setError(state, error) {
//             state.error = error
//         },
//     },
//     actions: {
//         async saveLoginUserData({ commit, dispatch }, loginResult) {
//             // console.log('loginResult')
//             // console.log(loginResult)
//             //--------- user data -------
//             const user = loginResult?.user // об'єкт користувача
//             commit('setUser', user)
//             //user.displayName - ім'я акаунту
//             //user.photoURL - аватар акаунту
//             //user.email - електронна адреса акаунту

//             //--------- user access token -------
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             let credential = GoogleAuthProvider.credentialFromResult(loginResult)
//             // console.log('credential')
//             // console.log(credential)

//             localStorage.setItem('authCredential', JSON.stringify(credential))
//             dispatch('users/loadUserPermissions', user.uid, { root: true })
//         },
//         loginWithGoogle({ commit, dispatch }) {
//             const provider = new GoogleAuthProvider()
//             signInWithPopup(auth, provider)
//                 .then((loginResult) => {
//                     dispatch('saveLoginUserData', loginResult)
//                 })
//                 .catch((error) => {
//                     commit('setError', error)
//                 })
//         },
//         async loginWithCredential({ commit, dispatch }) {
//             return new Promise((resolve, reject) => {
//                 let credential = localStorage.getItem('authCredential')

//                 if (credential) {
//                     credential = JSON.parse(credential)

//                     credential = GoogleAuthProvider.credential(credential.idToken)

//                     signInWithCredential(auth, credential)
//                         .then((loginResult) => {
//                             dispatch('saveLoginUserData', loginResult)
//                             resolve(loginResult)
//                         })
//                         .catch((error) => {
//                             console.log(error)
//                             commit('setError', error)
//                             // Handle Errors here.
//                             //var errorCode = error.code
//                             //var errorMessage = error.message
//                             // The email of the user's account used.
//                             //var email = error.email
//                             reject(false)
//                         })
//                 } else resolve(false)
//             })
//         },
//         logout({ commit, dispatch }) {
//             signOut(auth)
//                 .then(() => {
//                     localStorage.removeItem('authCredential')
//                     commit('setUser', null)
//                     dispatch('users/clearPermissions', null, { root: true })
//                 })
//                 .catch((error) => {
//                     commit('setError', error)
//                 })
//         },
//         createUser({ commit, dispatch }, userInfo) {
//             let { email, password } = userInfo

//             return new Promise((resolve, reject) => {
//                 createUserWithEmailAndPassword(auth, email, password)
//                     .then(async (userCredential) => {
//                         const userToUpdate = auth.currentUser
//                         await updateProfile(userToUpdate, {
//                             displayName: `${userInfo.first} ${userInfo.last}`,
//                         })

//                         // Збереження даних аутентифікації в localStorage
//                         localStorage.setItem(
//                             'authCredential',
//                             JSON.stringify({
//                                 email: userCredential?.user?.email,
//                                 password: userInfo.password,
//                             })
//                         )
//                         dispatch('saveLoginUserData', userCredential)

//                         resolve(userCredential)
//                     })
//                     .catch((error) => {
//                         commit('setError', error, { root: true })
//                         reject(error)
//                     })
//             })
//         },

//         signInUser({ commit, dispatch }, { email, password }) {
//             return new Promise((resolve, reject) => {
//                 signInWithEmailAndPassword(auth, email, password)
//                     .then((loginResult) => {
//                         dispatch('saveLoginUserData', loginResult)
//                         resolve(loginResult)
//                     })
//                     .catch((error) => {
//                         commit('setError', error)
//                         reject(error)
//                     })
//             })
//         },
//     },
// }
// //  signInWithEmailAndPassword(auth, email, password)
// //      .then(async (userCredential) => {
// //          // Збереження даних аутентифікації в localStorage
// //          localStorage.setItem(
// //              'authCredential',
// //              JSON.stringify({
// //                  email: email,
// //                  password: password,
// //              })
// //          )
// //          dispatch('saveLoginUserData', userCredential)
// //          resolve(userCredential)
// //      })
// //      .catch((error) => {
// //          // console.log('error')
// //          // console.log(error)
// //          commit('setError', error)
// //          reject(error)
// //      })
