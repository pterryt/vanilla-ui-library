export function home_view() {
  const view = document.createElement('div');
  view.classList.add('main-view');
  view.textContent = 'Home';
  return view;
}