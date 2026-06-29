import { create_nav_bar } from "@layout/nav_bar.js";
import { Router } from "@app/router.js";
import { Store } from "@app/store.js";
import { ThemeService } from "@app/theme.js";


const app = document.getElementById('app');
const nav_div = document.getElementById('nav-div');
const view_root = document.getElementById('main-div');

const store = Store.createStore(
    {
      locale: "en",
      theme: "dark",
    }
)

ThemeService.initialize(store)

const { element, dispose } = create_nav_bar(store);
nav_div.appendChild(element);


const router = new Router(view_root);