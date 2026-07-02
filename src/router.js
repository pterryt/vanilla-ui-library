import {home_view} from "@layout/home.js";
import {gallery_view} from "@layout/gallery.js";
import {reader_view} from "@layout/reader.js";
import {table_view} from "@layout/table.js";
import {statistics_view} from "@layout/statistics.js";
import {settings_view} from "@layout/settings.js";
import Logger from "@app/src/logger.js";

const log = Logger.get("Router");

export class Router {
  constructor(view_root, app_context) {
    this.view_root = view_root;
    this.app_context = app_context;
    this.current = null;
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
    this.current?.dispose();
    this.current = this.routes[route](this.app_context);
    this.view_root.replaceChildren(this.current.view);
  }

  handleRoute() {
    const route = window.location.hash.slice(1) || "home";
    this.navigate(route);
  }
}