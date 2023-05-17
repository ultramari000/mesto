export class Card {
  constructor(cardData, templateElement, openImagePopup) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.place;
    this._templateElement = templateElement;
    this._openImagePopup = openImagePopup;
  }

  _cloneTemplate() {
    return document.querySelector(this._templateElement).content.querySelector('.element').cloneNode(true);
  } //вернули копию темплейта со всеми его частями ("подкопотная" функция, мы ее никак не видим)

  _likeCard = evt => {
    this._buttonLikePlaceElement.classList.toggle('element__info-like_active');
  }

  _deletePlaceElement = () => {
    this._cloneElement.remove();
    this._cloneElement = null; //свойство cloneElement удаляется из памяти
  }

  _openBigImage = () => {
    this._openImagePopup(this._cardData);
  }

  _setEventListener() {
    this._buttonLikePlaceElement.addEventListener('click', this._likeCard); // функция likeCard (поставить лайк/сделать класс активным или неактивным) вызывается при клике
    this._buttonDeletePlaceElement.addEventListener('click', this._deletePlaceElement); // функция deletePlaceElement (удалить карточку) вызывается при клике
    this._imgPlaceElement.addEventListener('click', this._openBigImage);
  }

  createCard() {
    this._cloneElement = this._cloneTemplate();
    this._imgPlaceElement = this._cloneElement.querySelector('.element__photo');
    this._namePlaceElement = this._cloneElement.querySelector('.element__info-title');
    this._buttonLikePlaceElement = this._cloneElement.querySelector('.element__info-like');
    this._buttonDeletePlaceElement = this._cloneElement.querySelector('.element__delete-button');
    this._imgPlaceElement.src = this._link;
    this._imgPlaceElement.alt = `На фото - ${this._name}`;
    this._namePlaceElement.textContent = this._name;
    this._setEventListener();
    return this._cloneElement;
  } //создали экземпляр для каждого элемента
}