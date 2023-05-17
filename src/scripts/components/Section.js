// класс Section, который отвечает за отрисовку элементов на странице
export class Section {
  constructor ( { items, renderer }, selector ) {
    // объявим класс, который в конструктор принимает items и renderer
    this._container = document.querySelector(selector);
    this._initialCards = items;
    this._renderer = renderer;
  }


  addCardFromArray() {
    this._initialCards.forEach((item) => {
      this.addItem(item);
    })
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(itemHtml) {
    this._container.prepend(this._renderer(itemHtml));
  }
}