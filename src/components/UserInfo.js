export class UserInfo {
  constructor(profileInfo) {
    this._profileName = document.querySelector(profileInfo.profileNameElement);
    this._profileDescription = document.querySelector(profileInfo.profileDescriptionElement);
    this._profileAvatar = document.querySelector(profileInfo.profileAvatarElement);
  }

  // публичный метод, который возвращает объект с данными пользователя.
  getUserInfo() {
    return {username: this._profileName.textContent, description: this._profileDescription.textContent};
  }

  //публичный метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ description, username, avatar }) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = username;
    this._profileDescription.textContent = description;
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }
}