import { create_nav_bar } from "./components/shared/nav_bar.js";
import { Router } from "./router.js";

const app = document.getElementById('app');
const nav_div = document.getElementById('nav-div');
const view_root = document.getElementById('main-div');

nav_div.appendChild(create_nav_bar());

const router = new Router(view_root);