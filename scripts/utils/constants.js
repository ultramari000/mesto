//массив с картинками, которые будут изначально
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openProfilePopupButtonElement = document.querySelector('.profile__info-button'); //кнопка открытия попапа профиля
const openPlacePopupButtonElement = document.querySelector('.profile__button'); //кнопка с плюсом для добавления карточки места

const popupImageSelector = '.image-popup';
const listElementsSelector = '.elements-grid';
const popupProfileSelector = '.popup_profile-info';
const popupAddPlaceSelector = '.popup_add-place';
const templateElement = '#element-template';

//объект, который понадобится в классе UserInfo. В нем – селекторы двух элементов: элемент имени пользователя и элемент информации о себе
const profileInfo = {
  profileNameElement: '.profile__name',
  profileDescriptionElement: '.profile__subtitle'
}

// объекты для валидации (перенесены из validate.js из пр6)
const validationConfig = {
  inputSelector: '.popup__input', //селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit-button', //селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled', //класс модификатор для дизэйбла кнопки "сохранить"
  inputErrorClass: 'popup__input-invalid', //класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible', //класс для видимости текста ошибки формы
  errorTemplateSelector: '.popup__invalid-span-'
};

export {
  initialCards,
  openProfilePopupButtonElement,
  openPlacePopupButtonElement,
  popupImageSelector,
  listElementsSelector,
  popupProfileSelector,
  popupAddPlaceSelector,
  templateElement,
  profileInfo,
  validationConfig
};