import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './ FormValidator.js';


//попап профиля
//константы попапа изменения профиля
const popupProfileElement = document.querySelector('.popup_profile-info'); //попап информации профиля
const closeProfilePopupButtonElement = popupProfileElement.querySelector('.popup__close-button'); //кнопка закрытия попапа
const openProfilePopupButtonElement = document.querySelector('.profile__info-button'); //кнопка открытия попапа профиля
const formForSubmitProfileElement = popupProfileElement.querySelector('.popup__form') // область формы для сабмита
const nameInput = popupProfileElement.querySelector('.popup__text-input_type_name'); //инпут имени в попапе профиля
const jobInput = popupProfileElement.querySelector('.popup__text-input_type_description'); //инпут описания в попапе профиля
const profileNameElement = document.querySelector('.profile__name'); // имя профиля на странице
const profileDescriptionElement = document.querySelector('.profile__subtitle'); //описание профиля на странице
const inputListFromProfileForm = popupProfileElement.querySelector('.popup__input'); //инпут описания в попапе профиля
const submitButtonFromProfileForm = popupProfileElement.querySelector('.popup__submit-button');
const popupElement = document.querySelectorAll('.popup');
const popupProfileFormForValidation = document.forms.profileForm;
const popupPLaceFormForValidation = document.forms.addPlaceForm;

// объекты для валидации (перенесены из validate.js из пр6)
const validationConfig = {
  inputSelector: '.popup__input', //селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit-button', //селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled', //класс модификатор для дизэйбла кнопки "сохранить"
  inputErrorClass: 'popup__input-invalid', //класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible', //класс для видимости текста ошибки формы
  errorTemplateSelector: '.popup__invalid-span-'
};

//отправка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // запрет отправки на серв
  profileNameElement.textContent = nameInput.value; //замена имени на имя из инпута
  profileDescriptionElement.textContent = jobInput.value; //замена описания на описание из инпута
  closeProfilePopup(); // закрыть попап после сабмита
}

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавление класса с открытым попапом
  document.addEventListener('keydown', closePopupByEscape);
}

//функция открытия попапа профиля 
function openProfilePopup() {
  formProfileInfoValidator.resetForOpenedForm();
  openPopup(popupProfileElement);
  nameInput.value = profileNameElement.textContent; //изначально стоит не плейсхолдер а имя из html
  jobInput.value = profileDescriptionElement.textContent; //изначально стоит не плейсхолдер а описание из html
};

//универсальная функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened'); //удаление класса с открытым попапом
  document.removeEventListener('keydown', closePopupByEscape);
}

// закрыть попап по клику на эскейп
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// закрыть попап по клику вне попапа
function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

//функция закрытия попапа профиля
function closeProfilePopup() {
  closePopup(popupProfileElement); 
};

//попап карточек мест
//константы добавления карточек мест
const popupPlaceCardElement = document.querySelector('.popup_add-place'); //попап добавления карточки места
const closePlacePopupButtonElement = popupPlaceCardElement.querySelector('.popup__close-button'); //кнопка закрытия попапа карточки места
const openPlacePopupButtonElement = document.querySelector('.profile__button'); //кнопка с плюсом для добавления карточки места
const placeInput = popupPlaceCardElement.querySelector('.popup__text-input_type_place'); //ипут названия места
const imgInput = popupPlaceCardElement.querySelector('.popup__text-input_type_link'); //инпут ссылки на картинку
const templateElement = '#element-template';
const placesList = document.querySelector('.elements-grid'); //куда добавляются все карточки
const formForSubmitPlaceElement = popupPlaceCardElement.querySelector('.popup__form'); //форма для сабмита

//открыть попап с добавлением карточки
function openPlacePopup() {
  formPLaceInfoValidator.resetForOpenedForm();
  formForSubmitPlaceElement.reset();
  openPopup(popupPlaceCardElement);
};

//закрыть попап добавления карточки
function closePlacePopup() {
  closePopup(popupPlaceCardElement);
};

//константы попапа с открытием картинки
const openedImageElement = document.querySelector('.image-popup');
const closeImageElementButton = openedImageElement.querySelector('.popup__close-button');
const imageCardElement = openedImageElement.querySelector('.image-popup__img');
const captionImageElement = openedImageElement.querySelector('.image-popup__caption');

//функция открытия картинки
function openImagePopup(item) {
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;
  captionImageElement.textContent = item.name;
  openPopup(openedImageElement);
}

//функция закрытия картинки
function closeImagePopup() {
  closePopup(openedImageElement);
}

//функция, которая создает экземпляр класса
function addNewCard(item) {
  const card = new Card(item, templateElement, openImagePopup);
  const сardElement = card.createCard();
  return сardElement; //создаем dom-элемент
}

//добавляем карточки в список
initialCards.forEach((item) => {
  placesList.append(addNewCard(item));
})

//функция добавления карточки с местом при сабмите
formForSubmitPlaceElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); // запрет отправки на серв
  const objectNamedUrl = {name: placeInput.value, link: imgInput.value};
  const card = new Card(objectNamedUrl, templateElement, openImagePopup);
  placesList.prepend(card.createCard());
  closePlacePopup(popupPlaceCardElement); // закрыть попап после сабмита
  evt.target.reset();
});

// экземпляр класса FormValidator для formProfileInfoValidator для запуска валидации
const formProfileInfoValidator = new FormValidator(validationConfig, popupProfileFormForValidation);
formProfileInfoValidator.enableValidation();

// экземпляр класса FormValidator для formPLacesInfoValidator для запуска валидации
const formPLaceInfoValidator = new FormValidator(validationConfig, popupPLaceFormForValidation);
formPLaceInfoValidator.enableValidation();


openProfilePopupButtonElement.addEventListener('click', openProfilePopup); //по клику на кнопку карандаша попап профиля открывается
closeProfilePopupButtonElement.addEventListener('click', closeProfilePopup); //по клику на крест попап профиля закрывается
openPlacePopupButtonElement.addEventListener('click', openPlacePopup); //по клику на кнопку плюса попап карточки открывается
closePlacePopupButtonElement.addEventListener('click', closePlacePopup); //по клику на кнопку крестика попап карточки закрывается
closeImageElementButton.addEventListener('click', closeImagePopup);
formForSubmitProfileElement.addEventListener('submit', handleProfileFormSubmit); //по клику отправляется форма профиля
popupProfileElement.addEventListener('mousedown', (evt) => closePopupByClickOverlay(evt));
popupPlaceCardElement.addEventListener('mousedown', (evt) => closePopupByClickOverlay(evt));
openedImageElement.addEventListener('mousedown', (evt) => closePopupByClickOverlay(evt));