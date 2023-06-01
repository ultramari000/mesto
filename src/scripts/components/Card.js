export class Card {
  constructor(cardData, templateElement, openImagePopup, openDeleteCardPopup, makeLike) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._userId = cardData.userId;
    this._ownerId = cardData.owner._id;
    this._cadrId = cardData._id;
    this._likes = cardData.likes;
    this._likesAmount = cardData.likes.length;
    this._templateElement = templateElement;
    this._openImagePopup = openImagePopup;
    this._openDeleteCardPopup = openDeleteCardPopup;
    this._cloneElement = this._cloneTemplate();
    this._makeLike = makeLike;
    this._imgPlaceElement = this._cloneElement.querySelector('.element__photo');
    this._namePlaceElement = this._cloneElement.querySelector('.element__info-title');
    this._buttonLikePlaceElement = this._cloneElement.querySelector('.element__info-like');
    this._buttonDeletePlaceElement = this._cloneElement.querySelector('.element__delete-button');
    this._counter = this._cloneElement.querySelector('.element__like-counter');
  }

  _cloneTemplate() {
    return document.querySelector(this._templateElement).content.querySelector('.element').cloneNode(true);
  } //вернули копию темплейта со всеми его частями ("подкопотная" функция, мы ее никак не видим)

  _likeCard = evt => {
    this._makeLike(this._buttonLikePlaceElement, this._cadrId);
    // this._buttonLikePlaceElement.classList.toggle('element__info-like_active');
  }

  _deletePlaceElement = () => {
    this._openDeleteCardPopup({element: this, cardId: this._cadrId})
  }

  _openBigImage = () => {
    this._openImagePopup(this._cardData);
  }

  _setEventListener() {
    this._buttonLikePlaceElement.addEventListener('click', this._likeCard); // функция likeCard (поставить лайк/сделать класс активным или неактивным) вызывается при клике
    this._buttonDeletePlaceElement.addEventListener('click', this._deletePlaceElement); // функция deletePlaceElement (удалить карточку) вызывается при клике
    this._imgPlaceElement.addEventListener('click', this._openBigImage);
  }

  _showVisibilityForDeleteButton() {
    this._userId === this._ownerId ? this._buttonDeletePlaceElement.style.display = 'block' : this._buttonDeletePlaceElement.style.display = 'none';
  }

  _checkLikeStatus() {
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._buttonLikePlaceElement.classList.add('element__info-like_active');
        return
      }
    })
    this._counter.textContent = this._likesAmount
  }

  toggleLike(likes) {
    this._buttonLikePlaceElement.classList.toggle('element__info-like_active');
    this._counter.textContent = likes.length;
  }

  removeCard() {
    this._cloneElement.remove();
    this._cloneElement = null; //свойство cloneElement удаляется из памяти
  }

  createCard() {
    this._imgPlaceElement.src = this._link;
    this._imgPlaceElement.alt = `На фото - ${this._name}`;
    this._namePlaceElement.textContent = this._name;
    this._showVisibilityForDeleteButton()
    this._checkLikeStatus();
    this._setEventListener();
    return this._cloneElement;
  } //создали экземпляр для каждого элемента
}