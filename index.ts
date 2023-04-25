import TelegramApi from "node-telegram-bot-api";
import {
  gameOptions,
  againOptions,
  keyboardForRegAndLog,
  mainMenu,
  sendContact,
  menuList,
  evosMenu,
  kfcMenu,
  grandMenu,
  yesOrNo,
  selecFood,
  basketAndBack,
  basket,
  evosMenuWithBasket,
  kfcMenuWithBasket,
  deleteBasket,
  location,
  keyboardForLocation,
} from "./options";
import { sendSmsTo } from "./gateway";
import axios from "axios";
type ChatsObj = {
  [id: string]: string;
};

const token: string = "5872614035:AAHSCk9b9IOutumdws1XefI2x-simRpGCL8";
const bot = new TelegramApi(token, { polling: true });
const chats: ChatsObj = {};
let resultBasket: any = {};

const startGame = async (id: number): Promise<void> => {
  await bot.sendMessage(id, "Сейчас я загадаю число от 0 до 9, ты должен его отгадать!");
  const randomInt = Math.floor(Math.random() * 10);
  chats[id] = randomInt.toString();
  await bot.sendMessage(id, "Отгадай число!", gameOptions as any);
};

let checkCode: string = "";
const randomSixNumber = () => {
  let code: string = "";
  while (code.length < 6) {
    code += Math.floor(Math.random() * 10);
  }
  checkCode = code;
  return code;
};

const forBasket = async (id: number) => {
  await bot.sendMessage(id, "В корзине:", deleteBasket as any);
  let totalItem: string = "";
  let sumItem: number = 0;
  const detailItems = {
    inline_keyboard: [
      [
        { text: "Оформить заказ", callback_data: "to-order" },
        { text: "Очистить корзину", callback_data: "remove-items" },
      ],
    ],
  };

  for (let item in resultBasket) {
    sumItem += +resultBasket[item];
    totalItem += `${item} - ${resultBasket[item]} сумм\n`;
    detailItems.inline_keyboard.push([{ text: `Удалить - ${item}`, callback_data: `${item}` }]);
  }

  totalItem += `Товары: ${sumItem}\nДоставка: 10000 сумм\nИтого: ${+sumItem + 10000} сумм\n`;
  return bot.sendMessage(id, totalItem, { reply_markup: JSON.stringify(detailItems) } as any);
};

let checkReg: boolean = false;
let checkFio: boolean = false;
let previousMessageId: number = 0;
let previousPhotoId: number = 0;
let prevText: string = "a";
let prevPhoto: string = "";
let something: any;
let phoneNumber: string = "";
let checkLocation: boolean = false;
let totalStep = {
  step: 0,
};

const start = async (): Promise<void> => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "О себе" },
    { command: "/game", description: "Поиграй со мной)" },
  ]);

  bot.on("message", async (msg: TelegramApi.Message) => {
    const text = msg.text;
    const id = msg.chat.id;
    if (text == "Назад") {
      // if (previousMessageId) {
      // await bot.deleteMessage(id, previousMessageId);
      // if (previousPhotoId) {
      //   await bot.deleteMessage(id, previ  ousPhotoId);
      // };
      if (totalStep.step == 2) {
        totalStep.step -= 1;
        return await bot.sendMessage(id, prevText, something as any);
      }
      if (totalStep.step == 1) {
        totalStep.step -= 1;
        await bot.sendMessage(id, "Вы так же можете посмотреть что у вас в карзине!", basket as any);
        return await bot.sendMessage(id, "Это наши рестораны!", menuList as any);
      }
      return await bot.sendMessage(id, "Это наши рестораны!", menuList as any);
      // }
    }
    if (text == "/start") {
      await bot.sendSticker(id, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1");
      await bot.sendMessage(id, "Добро пожаловать на мой канал!");
      return await bot.sendMessage(id, "Пожалуиста пройдите верификацию!", keyboardForRegAndLog as any);
    }
    if (text == "/info") {
      if (msg.from?.first_name || msg.from?.last_name) {
        return await bot.sendMessage(id, `Вас зовут ${msg.from.first_name} ${msg.from.last_name}`);
      }
    }
    if (text == "/game") {
      return startGame(id);
    }
    if (text == "Пройти верификацию") {
      checkReg = true;
      return await bot.sendMessage(id, "Введите имя или что угодно, дальше этим именем мы будем к Вам обращаться))");
    }
    if (text == "Не проходить верификацию") {
      return await bot.sendMessage(id, "Жаль, вы упускаете шанс вкусно покушать!");
    }
    if (checkReg) {
      checkReg = false;
      checkFio = true;
      return await bot.sendMessage(
        id,
        `Уважаемый ${text} введите свой номер телефона, как на примере (901234567) или отправте свой контакт`,
        sendContact as any
      );
    }

    if (checkFio) {
      let checkNum = true;

      if (!text && !msg.contact) {
        return await bot.sendMessage(id, "Нельзя отправлять пустое значение", sendContact as any);
      }
      if (text) {
        for (let i = 0; i < text.length; i++) {
          if (!+text[i] && text[i] != "0") {
            checkNum = false;
            break;
          }
        }
        if (text.length !== 9 || !checkNum) {
          return await bot.sendMessage(id, "Не правильно, повторите ввод", sendContact as any);
        }
        phoneNumber = text;
      }
      if (msg.contact) {
        phoneNumber = msg.contact.phone_number;
      }
      checkFio = false;
      return await bot.sendMessage(id, `Вы уверены на счет этого номера?`, yesOrNo as any);
    }
    if (text == "Нет!") {
      checkFio = true;
      return await bot.sendMessage(
        id,
        `Уважаемый ${text} введите свой номер телефона, как на примере (901234567) или отправте свой контакт`,
        sendContact as any
      );
    }
    if (text == "Да!") {
      if (phoneNumber[0] == "+") {
        phoneNumber = phoneNumber.slice(1);
      } else if (text.length == 9) {
        phoneNumber = `998${phoneNumber}`;
      }

      const code = randomSixNumber();
      // await sendSmsTo(phoneNumber, `Ваш код: ${code}`);

      return await bot.sendMessage(id, `Мы вам на номер телефона ${phoneNumber} отправили код (тестовый 123)`);
    }
    if (text == checkCode || text == "123") {
      checkLocation = true;
      return await bot.sendMessage(id, "Отправте ваш адрес", location as any);
      // return await bot
      //   .sendMessage(id, "Спасибо что пользуетесь нашим ботом, С какого ресторана желаете заказать?", menuList as any)
      //   .then((sentMessage) => {
      //     previousMessageId = sentMessage.message_id;
      //   });
    }

    if (msg.location && checkLocation) {
      const location = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=MTYfMGbjmpQjc55isgqYIYuC5eCjTYgY&location=${msg.location.latitude},${msg.location.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );
      const street = location.data.results[0].locations[0].street;
      const town = location.data.results[0].locations[0].adminArea5;

      return await bot.sendMessage(
        id,
        `Вы подтверждаете, ваш город: ${town}, ваша улица: ${street} ?`,
        keyboardForLocation as any
      );
    }

    if (text == "Lavash") {
      totalStep.step += 1;
      prevText = "Меню ресторана Evos!";
      something = evosMenu;
      await bot.sendMessage(id, "Выбирайте", basketAndBack as any);
      await bot.sendPhoto(id, "./images/5e5ff5fdce05c.jpg").then((sentPhoto) => {
        previousPhotoId = sentPhoto.message_id;
      });
      await bot.sendMessage(id, "Это наш Evos лаваш");
      return await bot.sendMessage(id, "Стандарт лаваш - цена 25000 сумм", selecFood as any);
    }
    if (text == "Box Master 1") {
      totalStep.step += 1;
      prevText = "Меню ресторана КФС!";
      something = kfcMenu;
      await bot.sendMessage(id, "Выбирайте", basketAndBack as any);
      await bot.sendPhoto(id, "./images/5e5ff5fdce05c.jpg").then((sentPhoto) => {
        previousPhotoId = sentPhoto.message_id;
      });
      await bot.sendMessage(id, "Это наш КФС Box Master 1");
      return await bot.sendMessage(id, "Box Master 1 - цена 40000 сумм", selecFood as any);
    }

    if (text == "Корзина") {
      if (Object.keys(resultBasket).length == 0) {
        await bot.sendSticker(id, "https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/7.webp");
        return await bot.sendMessage(id, "Корзина пуста!", deleteBasket as any);
      }
      return await forBasket(id);
    }
    return await bot.sendMessage(id, "Я вас не понимаю, попробуйте еше раз!", mainMenu as any);
  });

  bot.on("callback_query", async (msg: TelegramApi.CallbackQuery) => {
    const data = msg.data;
    const id = msg.message?.chat.id;

    if (data == "1") {
      if (msg && msg.message && msg.message.message_id) {
        await bot.deleteMessage(id!, msg.message.message_id);
      }
      totalStep.step += 1;
      return await bot.sendMessage(id!, `Меню ресторана Evos`, evosMenu as any).then((sentMessage) => {
        previousMessageId = sentMessage.message_id;
      });
    }
    if (data == "2") {
      if (msg && msg.message && msg.message.message_id) {
        await bot.deleteMessage(id!, msg.message.message_id);
      }
      totalStep.step += 1;
      return await bot.sendMessage(id!, `Меню ресторана KFC`, kfcMenu as any).then((sentMessage) => {
        previousMessageId = sentMessage.message_id;
      });
    }
    if (data == "3") {
      if (msg && msg.message && msg.message.message_id) {
        await bot.deleteMessage(id!, msg.message.message_id);
      }
      totalStep.step += 1;
      return await bot.sendMessage(id!, `Меню ресторана Grand Lavash`, grandMenu as any).then((sentMessage) => {
        previousMessageId = sentMessage.message_id;
      });
    }
    if (data == "basket") {
      const arrNameCost = msg.message?.text?.split(" - ");
      resultBasket[arrNameCost![0]] = arrNameCost![1].split(" ")[1];

      if (prevText.split(" ")[2] == "Evos!") {
        totalStep.step -= 1;
        await bot.sendSticker(id!, "https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp");
        if (Object.keys(resultBasket).length) {
          return await bot.sendMessage(id!, `Evos!, Вы заказали "${arrNameCost![0]}"`, evosMenuWithBasket as any);
        }
        return await bot.sendMessage(id!, `Evos!, Вы заказали "${arrNameCost![0]}"`, evosMenu as any);
      }
      if (prevText.split(" ")[2] == "КФС!") {
        totalStep.step -= 1;
        await bot.sendSticker(id!, "https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp");
        if (Object.keys(resultBasket).length) {
          return await bot.sendMessage(id!, `КФС!, Вы заказали "${arrNameCost![0]}"`, kfcMenuWithBasket as any);
        }
        return await bot.sendMessage(id!, `КФС!, Вы заказали "${arrNameCost![0]}"`, kfcMenu as any);
      }
    }
    if (data == "remove-items") {
      resultBasket = {};
      await bot.sendMessage(id!, "Корзина очищена!");
      return await bot.sendMessage(id!, "Это наши рестораны!", menuList as any);
    }
    if (resultBasket.hasOwnProperty(data)) {
      delete resultBasket[`${data}`];
      if (Object.keys(resultBasket).length == 0) {
        await bot.sendSticker(id!, "https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/7.webp");
        return await bot.sendMessage(id!, "Корзина пуста!", deleteBasket as any);
      }
      return await forBasket(id!);
    }

    // if (data == "back") {
    //   if (msg && msg.message && msg.message.message_id) {
    //     await bot.deleteMessage(id!, msg.message.message_id);
    //   }
    //   0;
    //   return await bot.sendMessage(id!, `С какого ресторана желаете заказать?`, menuList as any);
    // }
    // const id = msg.message!.chat.id;
    // if (data == "/again") {
    //   return startGame(id);
    // }
    // if (data == chats[id]) {
    //   return await bot.sendMessage(id, `Поздравляю, ты отгадал цифру ${chats[id]}`, againOptions as any);
    // } else {
    //   return await bot.sendMessage(
    //     id,
    //     `К сожалению ты не отгадал, бот загадал цифру ${chats[id]}`,
    //     againOptions as any
    //   );
    // }
  });
};
start();
