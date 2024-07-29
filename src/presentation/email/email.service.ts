import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
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
    const { to, subject, htmlBody, attachments = [] } = sendEmailOptions;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `<h3>Logs del Sistema - NOC</h3>
    <p>Texto de prueba</p>
    <p>Ver logs adjuntos</p>`;
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-low.log", path: "./logs/logs-low.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
