import {LocaleService} from "@app/src/locale.js";
import {Disposable} from "@app/src/disposable.js";

export function table_view(app_context) {

  const app_store =  app_context.store;
  const lifecycle = Disposable.create_disposable_scope();

  lifecycle.own(app_store.subscribe( s => s.locale, render ))

  const view = document.createElement('div');
  view.classList.add('main-view');

  render();

  return { view: view, dispose: lifecycle.dispose } ;

  function render() {
    view.textContent = LocaleService.t("nav", "table");
  }
}
