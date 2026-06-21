export function table_view() {
  const view = document.createElement('div');
  const welcome_message = document.createElement('h1')
  welcome_message.textContent = 'Table';
  view.appendChild(welcome_message);
  return view;
}
