export class UserInfo {
  constructor(profileInfo) {
    this._profileName = document.querySelector(profileInfo.profileNameElement);
    this._profileDescription = document.querySelector(profileInfo.profileDescriptionElement);
  }

  // публичный метод, который возвращает объект с данными пользователя.
  getUserInfo() {
    return {username: this._profileName.textContent, description: this._profileDescription.textContent};
  }

  //публичный метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userData) {
    this._profileName.textContent = userData.username;
    this._profileDescription.textContent = userData.description;
  }
}