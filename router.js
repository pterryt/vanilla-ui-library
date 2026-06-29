import {home_view} from "@layout/home.js";
import {gallery_view} from "@layout/gallery.js";
import {reader_view} from "@layout/reader.js";
import {table_view} from "@layout/table.js";
import {statistics_view} from "@layout/statistics.js";
import {settings_view} from "@layout/settings.js";

export class Router {
  constructor(view_root) {
    this.view_root = view_root;
    this.routes = {
      home: home_view,
      reader: reader_view,
      table: table_view,
      statistics: statistics_view,
      gallery: gallery_view,
      settings: settings_view,
    };


    window.addEventListener(
        "hashchange",
        () => this.handleRoute()
    );

    window.addEventListener(
        "load",
        () => this.handleRoute()
    );
  }

  navigate(route) {
    this.view_root.replaceChildren(this.routes[route]());
  }

  handleRoute() {
    const route = window.location.hash.slice(1) || "home";
    this.navigate(route);
  }
}