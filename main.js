import {create_nav_bar} from "@layout/nav_bar.js";
import {Router} from "@app/router.js";
import {Store} from "@app/store.js";
import {ThemeService} from "@app/theme.js";
import {LocaleService} from "@app/locale.js";
import Logger from "@app/logger.js"

Logger.level = Logger.LEVELS.TRACE;

const app = document.getElementById('app');
const nav_div = document.getElementById('nav-div');
const view_root = document.getElementById('main-div');

const store = Store.createStore({
  locale: "ja", theme: "dark",
});

LocaleService.initialize(store);
ThemeService.initialize(store);

const app_context = {store}

const {element, dispose} = create_nav_bar(store);
nav_div.appendChild(element);

const router = new Router(view_root, app_context);