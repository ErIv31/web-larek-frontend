# Проектная работа "Веб-ларек"
https://github.com/ErIv31/web-larek-frontend.git

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Приложение **Web-ларёк** построен по паттерну **MVP (Model-View-Presenter)**, который представлен 3 слоями:
- Модель (Model) предоставляет данные для пользовательского интерфейса.
- Представление (View) реализует отображение данных (Модели).
- Презентер (Presenter) обеспечивает взаимодействие между Моделью и Представлением, например, извлекает данные из Модели и форматирует их для отображения в Представлении.   

## Данные и типы данных, используемые в приложении

Типы данных карточки

```
type TCardCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
```

Карточка

```
interface ICard {
  id: string;
  description: string;
  image: string;  
  title: string;  
  category: string;
  price: number | null;
  index?: number;
}
```

Массив карточек

```
interface ICardArray {
  items: ICard[];
} 
```
