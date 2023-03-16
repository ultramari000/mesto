const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__info-button');
const formElement = document.querySelector('.popup__form')
const nameInput = popupElement.querySelector('.popup__text-input_type_name');
const jobInput = popupElement.querySelector('.popup__text-input_type_description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__subtitle');

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
};

function closePopup() {
  popupElement.classList.remove('popup_opened');
};

 function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
  closePopup();
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);