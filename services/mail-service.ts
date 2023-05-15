import nodemailer from "nodemailer";
const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env;

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const mailService = {
  sendMail: async (email: string, link: string) => {
    await transport.sendMail({
      from: "pumba8897@yandex.ru",
      to: email,
      subject: "Активация аккаунта",
      text: "",
      html: `
        <div>
        <h1>Activation</h1>
        <p>${link}</p>
        </div>
      `,
    });
  },
};
