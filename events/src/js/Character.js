export default class Character {
  constructor(imageSrc, altText, className) {
    this.element = document.createElement("img");
    this.element.src = imageSrc;
    this.element.alt = altText;
    this.element.classList.add(className);
    this.currentPosition = null;
  }

  getElement() {
    return this.element;
  }

  setPosition(position) {
    this.currentPosition = position;
  }

  getPosition() {
    return this.currentPosition;
  }
}
