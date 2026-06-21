export function gallery_view() {
  const view = document.createElement('div');
  const welcome_message = document.createElement('h1')
  welcome_message.textContent = 'Gallery';
  view.appendChild(welcome_message);
  return view;
}
