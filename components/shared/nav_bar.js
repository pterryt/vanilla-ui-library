export class CNavBar extends HTMLElement {
  constructor() {
    super();
    this.element = document.createElement('nav');
    this.element.classList.add('c-nav-bar');

    const containers = this.init_containers();
    this.left_container = containers[0];
    this.center_container = containers[1];
    this.right_container = containers[2];

    this.has_user = false;
    this.has_settings = true;
  }

  init_containers = () => {

    const left_container = document.createElement('div');
    left_container.classList.add('c-nav-bar-left-container');
    this.element.appendChild(left_container);

    const center_container = document.createElement('div');
    center_container.classList.add('c-nav-bar-center-container');
    this.element.appendChild(center_container);

    const right_container = document.createElement('div');
    right_container.classList.add('c-nav-bar-right-container');
    this.element.appendChild(right_container);

    return [left_container, center_container, right_container]
  }

  create() {
    this.element.classList.add('c-nav-bar');

    const links = [

      {label: "Gallery", href: "gallery_page.html"},
      {label: "Reader", href: "reader_page.html"},
      {label: "Table", href: "table_page.html"},
      {label: "Statistics", href: "statistics_page.html"}
    ]

    links.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.classList.add('c-nav-bar-link');
      linkElement.textContent = link.label;
      linkElement.href = link.href;
      this.center_container.appendChild(linkElement);
    });

  }
}
