import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

/* este será mi servicio para mandar correos y también será nuestro patrón adaptador para centralizar el uso del paquete de terceros */
export class EmailService {
  /* este transporter es el objeto que termina mandando nuestro correo electrónico */
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(sendEmailOptions: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = sendEmailOptions;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
