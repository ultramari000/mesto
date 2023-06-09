export class FormValidator {
constructor(config, form) {
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._errorClass = config.errorClass;
  this._errorTemplateSelector = config.errorTemplateSelector;
  this._form = form;
  this._inputList = form.querySelectorAll(this._inputSelector);
  this._button = form.querySelector(this._submitButtonSelector);
}

_showInputError(errorTextElement, input) {
  input.classList.add(this._inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
}

_hideInputError(errorTextElement, input) {
  input.classList.remove(this._inputErrorClass);
  errorTextElement.textContent = '';
}

_hasInvalidInput(){
  return Array.from(this._inputList).every((input) => input.validity.valid);
}

_disableButtonSubmit() {
  this._button.classList.add(this._inactiveButtonClass);
  this._button.disabled = true;
}

_toggleButtonStyle() {
  if (this._hasInvalidInput()) {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  } else {
    this._disableButtonSubmit();
}
}

_checkInputValidity(input) {
  const errorTextElement = this._form.querySelector(`${this._errorTemplateSelector}${input.name}`);
  if (input.validity.valid) {
    this._hideInputError(errorTextElement, input)
  } else {
    this._showInputError(errorTextElement, input)
  }
}

enableValidation() {
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleButtonStyle();
    })
  })
}

resetForOpenedForm() {
  this._inputList.forEach(input => {
    const errorTextElement = this._form.querySelector(`${this._errorTemplateSelector}${input.name}`)
    if (!input.validity.valid) {
      this._hideInputError(errorTextElement, input);
    }
  })
  this._disableButtonSubmit();
}
}