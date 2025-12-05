export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Сделал универсальные ответы, в реальном проекте я бы их разбил константу на сущности (users, cards, etc.)
export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Произошла ошибка на сервере',
  BAD_REQUEST: 'Переданы некорректные данные',
  NOT_FOUND: 'Не найдено',
};