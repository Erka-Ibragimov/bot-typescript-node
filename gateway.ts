import FormData from "form-data";
import axios from "axios";

const config = {
  SMS_EMAIL: "erkaibragimov@gmail.com",
  SMS_PASSWORD: "iY0pRNXwOzgla#QZ",
};

const authService = async (email: string, password: string) => {
  try {
    const reqBody = new FormData();

    reqBody.append("email", email);
    reqBody.append("password", password);

    const response = await axios("https://notify.eskiz.uz/api/auth/login", {
      method: "POST",
      data: reqBody,
    });
    console.log(response);
    console.log("here");
    const data: any = await response;

    if (response.status >= 200 && response.status < 300) {
      data.success = true;
      return data;
    }

    data.success = false;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const sendSmsTo = async (phoneNumber: string, message: string) => {
  const authInfo = await authService(config.SMS_EMAIL, config.SMS_PASSWORD);
  if (!authInfo.success) {
    return authInfo;
  }

  const reqBody = new FormData();

  reqBody.append("mobile_phone", phoneNumber);
  reqBody.append("message", message);
  reqBody.append("from", 4546);

  const response = await axios("https://notify.eskiz.uz/api/message/sms/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authInfo.data.token}`,
    },
    data: reqBody,
  });

  const data: any = await response;

  if (response.status >= 200 && response.status < 300) {
    data.success = true;
    return data;
  }

  data.success = false;
  return data;
};
