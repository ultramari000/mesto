import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitFunction) {
    super(popupSelector);
    this._callbackSubmiFunction = callbackSubmitFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButtonElement = this._form.querySelector('.popup__submit-button');
    this._defautTextSubmit = this._submitButtonElement.textContent;
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
    this._values[input.name] = input.value
    });
    return this._values;
  }

  setInputValues(profileInfo) {
    this._inputList.forEach(input => {
      input.value = profileInfo[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButtonElement.textContent = `${this._submitButtonElement.textContent}...`;
      this._callbackSubmiFunction(this._getInputValues());
    })
  }

  setDefautSubmitText() {
    this._submitButtonElement.textContent = this._defautTextSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }
}