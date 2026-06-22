export class CDropdownMenu {
  constructor(button, menu_items = []) {

    this.menu_items = []

    this.root = document.createElement('div');
    this.dropdown = document.createElement('div');
    this.button = button;

    this.root.classList.add("dropdown-menu-root");
    this.dropdown.classList.add("dropdown-menu");
    this.button.classList.add("dropdown-menu-button");

    this.root.append(this.button, this.dropdown);

    menu_items.forEach(item => this.add_menu_item(item));
    this.initEventListeners();

  }
  add_menu_item(item) {
    this.menu_items.push(item);
    this.dropdown.appendChild(item);
  }

  toggle_dropdown() {
    this.dropdown.classList.toggle("open");
  }

  get element() {
    return this.root;
  }

  get menu() {
    return this.dropdown;
  }

  initEventListeners() {

    this.dropdown.addEventListener("click", () => {
      this.menu.classList.remove("open");
    });

    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle_dropdown()
    });

    document.addEventListener("click", (e) => {
          if (!this.root.contains(e.target)) {
            this.menu.classList.remove("open");
          }
        }
    )

  }

}