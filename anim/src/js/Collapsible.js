export default class Collapsible {
  constructor(selector, params) {
    let defaults = {
      buttonText: "Collapse",
    };

    for (let key in defaults) {
      if (!params.hasOwnProperty(key)) {
        params[key] = defaults[key];
      }
    }

    this.params = params;
    this.selector = selector;
    this.node = document.querySelector(selector);

    if (!this.node) {
      throw new Error(`Element with selector ${this.selector} not found`);
    }

    this.render();
  }

  render() {
    this.node.innerHTML = this.#getTemplate(); // лучше append, но суть в анимации и скриптах, поэтому пренебрегаю
    this.#registerEventListeners();
  }

  #getTemplate() {
    return `<div class="collapsible">
      <div class="collapsible__inner">
        <button type="button" class="collapsible__button btn">${this.params.buttonText}</button>
        <div class="collapsible__accordion">
          <div class="collapsible__body">
            ${this.params.content}
          </div>
        </div>
      </div>
    </div>`;
  }

  #registerEventListeners() {
    this.node.addEventListener("click", (e) => {
      if (e.target.classList.contains("collapsible__button")) {
        const accordion = this.node.querySelector(".collapsible__accordion");

        // Если нужна доп стилизация, скажем крутить стрелочку как напрмиер в элеметнах FAQ то лучше ещё делать toggle class
        // Но пока так, так как всё по минимуму, без стрелочек
        if (accordion.style.maxHeight) {
          accordion.style.maxHeight = null;
        } else {
          accordion.style.maxHeight = accordion.scrollHeight + "px";
        }
      }
    });
  }
}

//Если бы контекст позволял понять можно было делать один инстанс, и делать метод типа create
// Инстанс бы вешал слушатель событий, а create просто генерировал шаблон html и добавлял бы в дом
// Был вариант ещё делать типа трансформатор. В html пишем теги типа <div data-collapsible data-button-text="Посмотреть детали" data-content="Длинющий текст"></div>
// И скрипт просто доставая из атрибутов содержимое строит виджет
// Но пока использую такой подход, идеальный для сферического вакуума
