import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const app = createApp(App);

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faLocation, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add( faUserSecret, faLocation, faTwitter, faRightFromBracket  );
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.productionTip = false

import './assets/fonts/stylesheet.css'
import './assets/style.css';
import './assets/uikit.css';


app.use(router);
app.mount('#app');

