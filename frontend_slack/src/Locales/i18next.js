import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  // en: {
  //   translation: {
  //     welcome: 'Welcome',
  //   },
  // },
  ru: {
    translation: {
      welcome: 'Войти',
      logOut: 'Выйти',
      registration: 'Регистрация',
      registrationButton: 'Зарегистрироваться',
      addChannel: 'Добавить канал',
      addChannelSuccess: 'Канал создан!',
      deleteChannel: 'Удалить канал',
      deleteChannelSuccess: 'Канал удален!',
      renameChannel: 'Переименовать канал',
      renemeChannelSuccess: 'Канал переименован!',
      actionСonfirm: 'Вы уверены?',
      cancelButton: 'Отменить',
      submittButton: 'Отправить',
      deleteButton: 'Удалить',
      renameButton: 'Переименовать',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      nik: 'Ваш ник',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      required: 'Обязательное поле',
      nameMinMax: 'От 3 до 20 символов',
      uniqueName: 'Имя канала должно быть уникальным',
      passwordMin: 'Пароль должен быть больше {{count}} символов',
      passwordConfirmValid: 'Пароли должны совпадать',
      loginMistake: 'Неверное имя или пароль.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // язык по умолчанию
    interpolation: {
      escapeValue: false, // react уже экранирует значения
    },
  });

export default i18n;
