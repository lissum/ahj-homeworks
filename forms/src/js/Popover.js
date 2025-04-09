export default class Popover {
  constructor(options) {
    this.target = options.target;
    this.title = options.title || "Popover title";
    this.content = options.content || "Popover content";
    this.popoverElement = null;
    this.isVisible = false;

    // Bind methods
    this.toggle = this.toggle.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.createPopoverElement = this.createPopoverElement.bind(this);
    this.positionPopover = this.positionPopover.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.target.addEventListener("click", this.toggle);
  }

  createPopoverElement() {
    const popover = document.createElement("div");
    popover.className = "popover";
    popover.setAttribute("role", "tooltip");

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";

    const header = document.createElement("h3");
    header.className = "popover-header";
    header.textContent = this.title;

    const body = document.createElement("div");
    body.className = "popover-body";
    body.textContent = this.content;

    popover.appendChild(arrow);
    popover.appendChild(header);
    popover.appendChild(body);

    return popover;
  }

  show() {
    if (!this.popoverElement) {
      this.popoverElement = this.createPopoverElement();
      document.body.appendChild(this.popoverElement);
    }

    this.popoverElement.style.display = "block";
    this.positionPopover();
    this.isVisible = true;

    setTimeout(() => {
      document.addEventListener("click", this.handleOutsideClick);
    }, 0);
  }

  hide() {
    if (this.popoverElement) {
      this.popoverElement.style.display = "none";
      this.isVisible = false;
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  toggle(event) {
    event.stopPropagation();
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  positionPopover() {
    if (!this.popoverElement) return;

    const targetRect = this.target.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    // Calculate positions
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let top, left;

    top = scrollTop + targetRect.top - popoverRect.height - 10;
    left =
      scrollLeft +
      targetRect.left +
      targetRect.width / 2 -
      popoverRect.width / 2;

    this.popoverElement.style.top = `${top}px`;
    this.popoverElement.style.left = `${left}px`;

    const arrow = this.popoverElement.querySelector(".popover-arrow");
    arrow.style.top = `${popoverRect.height}px`;
    arrow.style.left = `${popoverRect.width / 2 - 10}px`;
  }

  handleOutsideClick(event) {
    if (
      this.popoverElement &&
      !this.popoverElement.contains(event.target) &&
      event.target !== this.target
    ) {
      this.hide();
    }
  }

  destroy() {
    this.target.removeEventListener("click", this.toggle);
    document.removeEventListener("click", this.handleOutsideClick);
    if (this.popoverElement && this.popoverElement.parentNode) {
      this.popoverElement.parentNode.removeChild(this.popoverElement);
    }
    this.popoverElement = null;
  }
}
