export function reader_view() {
  const view = document.createElement('div');
  const welcome_message = document.createElement('h1')
  welcome_message.textContent = 'Reader';
  view.appendChild(welcome_message);
  return view;
}
