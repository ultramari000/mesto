// класс Section, который отвечает за отрисовку элементов на странице
export class Section {
  constructor (renderer, selector ) {
    // объявим класс, который в конструктор принимает items и renderer
    this._container = document.querySelector(selector);
    // this._initialCards = items;
    this._renderer = renderer;
  }


  addCardFromArray(cardData) {
    cardData.forEach(item => {
      this._renderer(item);
    })
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItemPrepend(itemHtml) {
    this._container.prepend(itemHtml);
  }

  addItemAppend(itemHtml) {
    this._container.append(itemHtml);
  }
}