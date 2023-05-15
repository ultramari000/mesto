import { Popup } from "./Popup.js";

//перезаписывать родительский метод open
export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupOrigImage = this._popup.querySelector('.image-popup__img');
    this._imagePopupCaption = this._popup.querySelector('.image-popup__caption');
  }

  open = (cardData) => {
    this._popupOrigImage.src = cardData.link;
    this._popupOrigImage.alt = `На фото - ${cardData.place}`;
    this._imagePopupCaption.textContent = cardData.place;
    super.open();
  }
}