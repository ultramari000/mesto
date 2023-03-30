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

//отправка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // запрет отправки на серв
  profileNameElement.textContent = nameInput.value; //замена имени на имя из инпута
  profileDescriptionElement.textContent = jobInput.value; //замена описания на описание из инпута
  closeProfilePopup(); // закрыть попап после сабмита
};

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавление класса с открытым попапом
}

//функция открытия попапа профиля 
function openProfilePopup() {
  openPopup(popupProfileElement);
  nameInput.value = profileNameElement.textContent; //изначально стоит не плейсхолдер а имя из html
  jobInput.value = profileDescriptionElement.textContent; //изначально стоит не плейсхолдер а описание из html
};

//универсальная функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened'); //удаление класса с открытым попапом
}

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
const templateElement = document.querySelector('#element-template').content;
const placesList = document.querySelector('.elements-grid'); //куда добавляются все карточки
const formForSubmitPlaceElement = popupPlaceCardElement.querySelector('.popup__form_add-card'); //форма для сабмита
const likeButton = popupPlaceCardElement.querySelector('.element__info-like'); //кнопка лайка

//открыть попап с добавлением карточки
function openPlacePopup() {
  openPopup(popupPlaceCardElement);
};
//закрыть попап добавления карточки
function closePlacePopup() {
  closePopup(popupPlaceCardElement);
};
//функция для лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__info-like_active');
}

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

// переносим в темплейт
function createCard(item) {
  const placeElement = templateElement.querySelector('.element').cloneNode(true);
  const imgPlaceElement = placeElement.querySelector('.element__photo'); //добавили фото
  const buttonDeletePlaceElement = placeElement.querySelector('.element__delete-button'); //добавили кнопку мусорки
  const buttonLikePlaceElement = placeElement.querySelector('.element__info-like'); //добавили кнопку лайка
  imgPlaceElement.src = item.link;
  imgPlaceElement.alt = item.name;
  placeElement.querySelector('.element__info-title').textContent = item.name;
  buttonLikePlaceElement.addEventListener('click', evt => likeCard(evt));
  buttonDeletePlaceElement.addEventListener('click', evt => evt.target.closest('.element').remove());
  imgPlaceElement.addEventListener('click',() => openImagePopup(item));

  return placeElement;
}

//добавляем карточки в список
initialCards.forEach((item) => {
  const placeCard = createCard(item);
  placesList.append(placeCard);
})

formForSubmitPlaceElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); // запрет отправки на серв
  const objectNamedUrl = {name: placeInput.value, link: imgInput.value};
  placesList.prepend(createCard(objectNamedUrl));
  closePlacePopup(popupPlaceCardElement); // закрыть попап после сабмита
  evt.target.reset();
});

openProfilePopupButtonElement.addEventListener('click', openProfilePopup); //по клику на кнопку карандаша попап профиля открывается
closeProfilePopupButtonElement.addEventListener('click', closeProfilePopup); //по клику на крест попап профиля закрывается
openPlacePopupButtonElement.addEventListener('click', openPlacePopup); //по клику на кнопку плюса попап карточки открывается
closePlacePopupButtonElement.addEventListener('click', closePlacePopup); //по клику на кнопку крестика попап карточки закрывается
closeImageElementButton.addEventListener('click', closeImagePopup);
formForSubmitProfileElement.addEventListener('submit', handleProfileFormSubmit); //по клику отправляется форма профиля