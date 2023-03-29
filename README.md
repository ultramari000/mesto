# Проектная работа 5 – Mesto: карточки и попапы

## *Выполнила студентка Яндекс.Практикума Зыкова Мария*

### Обзор
* Описание проекта
* Используемые технологии
* Ссылка на GitHub Pages

**Описание проекта**

Проект Mesto – интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.
Проект создан в соответствии с макетом из Фигмы. Это одностраничный сайт, с применением "отзывчивой" верстки. Сайт корректно отображается на экранах с разным разрешением (минимальное – 320px, максимальное – 1280px).
Сайт при помощи JS-кода становится интерактивным. Пользователь может изменить имя профиля и описание, нажав на кнопку "редактировать" в разделе профиль. 
Также пользователь может добавить свое место, нажав на кнопку с плюсом, и вставив название и ссылку на фотографию.
Пользователь может поставить лайк и удалить ненужную карточку, нажав на корзину.
При нажатии на картинку в карточке, она открывается в полном размере с подписью.

**Используемые технологии**

Для отзывчивой верстки использованы медиазапросы. Файловая структура создана по БЭМ-методологии. Для построения сеток используются grid и flex-box верстка. Все ссылки активные и при наведении (:hover) затемняются с помощью свойства opacity. При нажатии на кнопку редактировать всплывает поп-ап, в который можно внести данные о себе и сохранить их на страничке, для данной технологии использованы DOM-элементы, и прочие возожности Java-Script.
Также добавлены попапы с добавлением карточки и открытой полноразмерной картинкой. 
Все попапы всплывают плавно при помощи свойсва css visibility и opacity.
Кнопки лайка и корзины интерактивные и выполняют свои функции.

**Ссылка на GitHub Pages**

https://ultramari000.github.io/mesto/index.html