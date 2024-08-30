import nodemailer from "nodemailer";
import { EmailService, SendEmailOptions } from "./email.service";

describe("Test in email.service.ts", () => {
  const mockSendMail = jest.fn();

  /* mock al createTransport y asegurarnos que haya sido llamado con X argumentos en donde en este caso serían nuestras variables */
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail, // crear un mock del método sendMail para poder probarlo, porque como el código y las envs no están configuradas para mandar a un correo entonces obviamente va a fallar, pero de esta forma al menos nos aseguramos de qué es lo que se envía
  });

  /* aquí se sabe que tiene dependencias ocultas, siempre y cuando se entre, porque así a simple vista no se sabe, pero la idea es que la misma clase pida esas dependencias y esa es una deuda técnica que en este caso se dejará así para poder tener el test de cómo sería de esa forma */
  const emailSevice = new EmailService();

  test("should send email", async () => {
    const options: SendEmailOptions = {
      to: "fernando@google.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    await emailSevice.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "fernando@google.com",
    });
  });

  test("should send email with attachements", async () => {
    const email = "fernando@google.com";
    await emailSevice.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        { filename: "logs-low.log", path: "./logs/logs-low.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      ]),
    });
  });
});
