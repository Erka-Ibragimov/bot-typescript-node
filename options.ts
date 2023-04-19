export const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

export const menuList = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Evos", callback_data: "1" }],
      [{ text: "Kfc", callback_data: "2" }],
      [{ text: "Grand Lavash", callback_data: "3" }],
    ],
  }),
};

export const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Играть еше раз", callback_data: "/again" }]],
  }),
};

export const keyboardForRegAndLog = {
  reply_markup: {
    keyboard: [["Пройти верификацию", "Не проходить верификацию"]],
    one_time_keyboard: true,
    force_reply: true,
  },
};

export const mainMenu = {
  reply_markup: {
    keyboard: [["Назад"]],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
};

export const yesOrNo = {
  reply_markup: {
    keyboard: [["Да!"], ["Нет!"]],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
};

export const sendContact = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Отправить контакт",
          request_contact: true,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const evosMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Lavash", callback_data: "Evos-Lavash" }],
      [{ text: "Burger", callback_data: "Evos-Burger" }],
      [{ text: "Mini lavash", callback_data: "Evos-Lavash-Mini" }],
      [{ text: "Mini burger", callback_data: "Evos-Burger-Mini" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
  }),
};

export const kfcMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Box Master 1", callback_data: "Box-1" }],
      [{ text: "Box Master 2", callback_data: "Box-2" }],
      [{ text: "Box Master 3", callback_data: "Box-3" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
  }),
};

export const grandMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Tandir Lavash", callback_data: "Tandir" }],
      [{ text: "Mandir Lavash", callback_data: "Mandir" }],
      [{ text: "Tudu Lavash", callback_data: "Tudu" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
  }),
};
