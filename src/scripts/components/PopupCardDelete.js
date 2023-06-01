import { Popup } from "./Popup.js";

export class PopupCardDelete extends Popup {
  constructor(popupSelector, callbackSubmitFunction) {
    super(popupSelector);
    this._callbackSubmiFunction = callbackSubmitFunction;
    this._submitButtonElement = this._form.querySelector('.popup__submit-button');
    this._defautTextDelete = this._submitButtonElement.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButtonElement.textContent = `${this._submitButtonElement.textContent}...`;
      this._callbackSubmiFunction({ card: this._element, cardId: this._cardId});
    })
  }

  setDefautDeleteButtonText() {
    this._submitButtonElement.textContent = this._defautTextDelete;
  }

  open = ({ element, cardId}) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}