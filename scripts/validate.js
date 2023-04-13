// объекты для валидации
const validationConfig = {
  formSelector: '.popup__form', //селектор формы
  inputSelector: '.popup__input', //селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit-button', //селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled', //класс модификатор для дизэйбла кнопки "сохранить"
  inputErrorClass: 'popup__input-invalid', //класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible', //класс для видимости текста ошибки формы
  errorTemplateSelector: '.popup__error_type-'
};

function enableValidation(validationConfig) {
  const formsArray = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formsArray.forEach((form) => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
    const button = form.querySelector(validationConfig.submitButtonSelector);
    setEventListener(inputList, button, validationConfig.errorTemplateSelector, validationConfig.inactiveButtonClass, validationConfig.errorClass, validationConfig.inputErrorClass);
    })
}

function setEventListener(inputList, button, errorTemplateSelector, inactiveButtonClass, errorClass, inputErrorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorTemplateSelector, inputErrorClass, errorClass);
      toggleButtonStyle(inputList, button, inactiveButtonClass);
    })
  })
}

function checkInputValidity(input, errorTemplateSelector, inputErrorClass, errorClass) {
  const errorTextElement = document.querySelector(`${errorTemplateSelector}${input.name}`);
  if (input.validity.valid) {
    hideInputError(input, errorTextElement, inputErrorClass, errorClass)
  } else {
    showInputError(input, errorTextElement, inputErrorClass, errorClass)
  }
}

function showInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
  errorTextElement.classList.add(errorClass);
}

function hideInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(errorClass);
}

// функция смены стиля кнопки
function toggleButtonStyle(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    console.log('ok');
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    console.log('not ok')
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
}
}

// функция проверки валидности инпутов
function hasInvalidInput(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid);
}

// убрать ошибки при открытии попапа
function resetErrorForOpeningPopup(form) {
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorTextElement = document.querySelector(`${validationConfig.errorTemplateSelector}${input.name}`); 
    if (!input.validity.valid) {
      hideInputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    }
  })
}

enableValidation(validationConfig)