import FormData from "form-data";
import axios from "axios";

const config = {
  SMS_EMAIL: "erkaibragimov@gmail.com",
  SMS_PASSWORD: "iUBs0hqeILCZ0DF8folZCX50h6DEvG3vXXsevoyb",
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

    const status: number = response.status;
    const statusText: string = response.statusText;
    const token: string = response.data.data.token;

    if (status >= 200 && response.status < 300 && statusText == "OK" && token) {
      return { token, status, statusText, success: true };
    }

    return { statusText: "Failed", success: false };
  } catch (error: any) {
    // console.log(error.message);
  }
};

export const sendSmsTo = async (phoneNumber: string, message: string) => {
  const authInfo = await authService(config.SMS_EMAIL, config.SMS_PASSWORD);
  if (!authInfo!.success) {
    return authInfo;
  }

  const reqBody = new FormData();

  reqBody.append("mobile_phone", phoneNumber);
  reqBody.append("message", message);
  reqBody.append("from", 4546);

  const response = await axios("https://notify.eskiz.uz/api/message/sms/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authInfo!.token}`,
    },
    data: reqBody,
  });

  const status: number = response.status;
  const statusText: string = response.statusText;

  if (status >= 200 && status < 300 && statusText !== "OK") {
    return { status, statusText, success: true };
  }

  return { statusText: "Failed", success: false };
};
