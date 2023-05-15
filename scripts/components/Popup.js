// класс Popup - отвечает за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
  }
  }

  _handleCloseButtonClose = () => {
    this.close();
  }

  _handleClickByOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButtonClose);
    this._popup.addEventListener('click', this._handleClickByOverlayClose)
  }

  //публичный метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened'); // добавить класс открытого попапа
    document.addEventListener('keydown', this._handleEscapeClose); // навесить слушатель на событие keydown - происх событие закрытия попапа при нажатии на esc
  }

  //публичный метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened'); // удалить класс открытого попапа
    document.removeEventListener('keydown', this._handleEscapeClose); // снять слушатель с события keydown
  }
}