# Мобильная версия сайта

Этот README описывает детали по установке и настройке вашего компьютера для разработки

## Стек используемых технологий

Вам потребуется установить на ваш компьютер

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Webpack](https://webpack.github.io/)

## Установка

* `git clone ssh://git@gl.sdvor.com:1251/frontend/sdvor-mobile-v2.git`
* `npm install`

### Переменные окружения

* `NODE_ENV=development` или `NODE_ENV=production`

* `API_URL_SDVOR=https://www.sdvor-dev.com/api/v1`
* `API_URL_CATALOG=https://catalog-api-dev.sdvor.com`


### Сборка проекта

* `npm run build`

### Запуск сервера для разработки

* `npm start`
* Перейди по адресу [http://localhost:3003](http://localhost:3003).

### Запуск локального сервера для тестирования

* `npm run server`
* Перейди по адресу [http://localhost:3003](http://localhost:3003).

### Запуск тестов
В качестве тестового движка используется [jest](https://facebook.github.io/jest/).
Для тестирования компонентов доволнительно подключается [enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md).
Все необходимые зависимости висят в devDependencies. 
Примеры тестирования экшенов, редюсеров и компонентов висят в соответствующих папках, в '_____tests_____'. 
Запуск теста:
* `npm test`

Запуск с флагом watch

* `npm test:watch`


