import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import {
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
} from '../scripts/utils/constants.js';

// 
const popupProfileFormForValidation = document.forms.profileForm;
const popupPLaceFormForValidation = document.forms.addPlaceForm;

const userInfo = new UserInfo(profileInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateElement, popupImage.open);
    return card.createCard();
  }
}, listElementsSelector)
section.addCardFromArray();

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, (data) => {
  section.addItem(data);
});

// экземпляр класса FormValidator для formProfileInfoValidator и formPLacesInfoValidator для запуска валидации
const formProfileInfoValidator = new FormValidator(validationConfig, popupProfileFormForValidation);
const formPLaceInfoValidator = new FormValidator(validationConfig, popupPLaceFormForValidation);

// проводим валидацию всех экземпляров 
formProfileInfoValidator.enableValidation();
formPLaceInfoValidator.enableValidation();

// навешиваем setEventListeners на экземпляры попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddPlace.setEventListeners();

openProfilePopupButtonElement.addEventListener('click', () => {
  formProfileInfoValidator.resetForOpenedForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}); //по клику на кнопку карандаша попап профиля открывается

openPlacePopupButtonElement.addEventListener('click', () => {
  formPLaceInfoValidator.resetForOpenedForm();
  popupAddPlace.open();
}); //по клику на кнопку плюса попап места открывается