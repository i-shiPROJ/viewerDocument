# Viewer Document

Приложение для просмотра документов с возможностью поиска.

## Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Отредактируйте файл `.env` и укажите ваши настройки API:
```env
VITE_API_BASE_URL=https://test-app-csm.up.railway.app
VITE_API_DOCS_ENDPOINT=/user/docs
```

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## API Endpoints

- **GET** `/user/docs?search={query}` - Поиск документов по названию
