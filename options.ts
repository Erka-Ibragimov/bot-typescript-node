export const location = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: "Отправить локацию", request_location: true }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  }),
};

export const keyboardForLocation = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: "Да, мой адрес" }], [{ text: "Нет, не мой адрес" }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  }),
};

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

export const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Играть еше раз", callback_data: "/again" }]],
  }),
};

export const keyboardForRegAndLog = {
  reply_markup: {
    keyboard: [["Пройти верификацию"], ["Не проходить верификацию"]],
    resize_keyboard: true,
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

export const basket = {
  reply_markup: {
    keyboard: [[{ text: "Корзина" }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const evosMenu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Lavash", callback_data: "Evos-Lavash" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  }),
};

export const evosMenuWithBasket = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Корзина" }],
      [{ text: "Lavash", callback_data: "Evos-Lavash" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  }),
};

export const kfcMenu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Box Master 1", callback_data: "Box-1" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  }),
};

export const kfcMenuWithBasket = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Корзина" }],
      [{ text: "Box Master 1", callback_data: "Box-1" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  }),
};

export const grandMenu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [
        { text: "Tandir Lavash", callback_data: "Tandir" },
        { text: "Mandir Lavash", callback_data: "Mandir" },
      ],
      [{ text: "Tudu Lavash", callback_data: "Tudu" }],
      [
        {
          text: "Назад",
          callback_data: "back",
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  }),
};

export const menuList = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Evos", callback_data: "1" }],
      [{ text: "Kfc", callback_data: "2" }],
      // [{ text: "Grand Lavash", callback_data: "3" }],
    ],
  }),
};

export const basketAndBack = {
  reply_markup: {
    keyboard: [[{ text: "Корзина" }], [{ text: "Назад" }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const selecFood = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "-", callback_data: "-" },
        { text: "1", callback_data: "count" },
        { text: "+", callback_data: "+" },
      ],
      [{ text: "В корзину", callback_data: "basket" }],
    ],
  }),
};

export const deleteBasket = {
  reply_markup: {
    keyboard: [[{ text: "Назад" }], [{ text: "Корзина" }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
