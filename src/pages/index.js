import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupCardDelete } from '../scripts/components/PopupCardDelete.js';
import { Api } from '../scripts/components/Api.js';
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
  validationConfig,
  popupAddAvatarSelector,
  openAddAvatarButtonElement,
  popupDeleteCardSelector
} from '../scripts/utils/constants.js';
import '../pages/index.css';

// 
const popupProfileFormForValidation = document.forms.profileForm;
const popupPLaceFormForValidation = document.forms.addPlaceForm;
const popupEditAvatarForValidation = document.forms.editAvatar;

const userInfo = new UserInfo(profileInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'e47cd8f9-0ab9-43ac-b7ad-9e6d33931e29',
    'Content-Type': 'application/json'
  }
})

const deleteCardPopup = new PopupCardDelete(popupDeleteCardSelector, ({card, cardId}) => {
  api.deleteCard(cardId)
    .then(res => {
      card.removeCard();
      deleteCardPopup.close();
    })
    .catch((error => console.error(`Ошибка при удалении карточки ${error}`)))
    .finally(() => deleteCardPopup.setDefautDeleteButtonText())
})

function createNewCard(element) {
  const card = new Card(element, templateElement, popupImage.open, deleteCardPopup.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('element__info-like_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((error => console.error(`Ошибка при снятии лайка ${error}`)))
    } else {
      api.likeCard(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((error => console.error(`Ошибка при добавлении лайка ${error}`)))
    }
  });
  return card.createCard();
}

const section = new Section((item) => {
    section.addItemAppend(createNewCard(item))
}, listElementsSelector);
// section.addCardFromArray(initialCards);

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ description: res.about, username: res.name, avatar: res.avatar });
      popupProfile.close();
    })
    .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
    .finally(() => popupProfile.setDefautSubmitText())
});

const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, cardData]) => {
      cardData.userId = dataUser._id;
      section.addItemPrepend(createNewCard(cardData));
      popupAddPlace.close();
    })
    .catch((error => console.error(`Ошибка при добавлении новой карточки ${error}`)))
    .finally(() => popupAddPlace.setDefautSubmitText())
});

const popupAddAvatar = new PopupWithForm(popupAddAvatarSelector, (data) => {
  api.setNewAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ description: res.about, username: res.name, avatar: res.avatar });
      popupAddAvatar.close();
    })
    .catch((error => console.error(`Ошибка при редактировании аватара ${error}`)))
    .finally(() => popupAddAvatar.setDefautSubmitText())
})

// экземпляр класса FormValidator для formProfileInfoValidator и formPLacesInfoValidator для запуска валидации
const formProfileInfoValidator = new FormValidator(validationConfig, popupProfileFormForValidation);
const formPLaceInfoValidator = new FormValidator(validationConfig, popupPLaceFormForValidation);
const formEditAvatarValidator = new FormValidator(validationConfig, popupEditAvatarForValidation);

// проводим валидацию всех экземпляров 
formProfileInfoValidator.enableValidation();
formPLaceInfoValidator.enableValidation();
formEditAvatarValidator.enableValidation();

// навешиваем setEventListeners на экземпляры попапов
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupAddAvatar.setEventListeners();
deleteCardPopup.setEventListeners();

openProfilePopupButtonElement.addEventListener('click', () => {
  formProfileInfoValidator.resetForOpenedForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}); //по клику на кнопку карандаша попап профиля открывается

openPlacePopupButtonElement.addEventListener('click', () => {
  formPLaceInfoValidator.resetForOpenedForm();
  popupAddPlace.open();
}); //по клику на кнопку плюса попап места открывается

openAddAvatarButtonElement.addEventListener('click', () => {
  formEditAvatarValidator.resetForOpenedForm();
  popupAddAvatar.open();
}); //по клику на кнопку плюса попап смены аватара открывается

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, cardData]) => {
    cardData.forEach(element => element.userId = dataUser._id);
    userInfo.setUserInfo({ description: dataUser.about, username: dataUser.name, avatar: dataUser.avatar });
    section.addCardFromArray(cardData);
  })
  .catch((error => console.error(`Ошибка при загрузке начальных данных ${error}`)))