import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import intersectionObserver from './directives/intersectionObserver'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})

/* add icons to the library */
library.add(fab, fas, far)
createApp(App)
    .directive('intersection', intersectionObserver)
    .use(router)
    .use(store)
    .use(vuetify)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
