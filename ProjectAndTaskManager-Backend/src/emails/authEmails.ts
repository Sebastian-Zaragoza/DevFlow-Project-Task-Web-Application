import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}
export class AuthEmails {
  static sendConfirmationEmail = async (user: IEmail) => {
    const confirmationUrl = `${process.env.FRONTEND_URL}/auth/confirm-account`;
    const info = await transporter.sendMail({
      from: `DevFlow <no-reply@devflow.com>`,
      to: user.email,
      subject: "DevFlow - Confirma tu cuenta",
      text: `Hola ${user.name}, por favor confirma tu cuenta usando el siguiente enlace: ${confirmationUrl}`,
      html: `
        <html>
          <body style="margin:0; padding:0; background-color:#F3F4F6;">
            <div style="
              max-width:600px;
              margin: 40px auto;
              background-color:#FFFFFF;
              border-radius:8px;
              font-family:Arial, sans-serif;
              padding:24px;
            ">
              <h2 style="
                color:#1F2937;
                font-size:24px;
                font-weight:700;
                margin-bottom:16px;
              ">
                Confirma tu cuenta
              </h2>
              <p style="
                color:#4B5563;
                font-size:16px;
                margin-bottom:24px;
              ">
                ¡Hola, ${user.name}! Gracias por crear tu cuenta en DevFlow. 
                Para activarla, haz clic en el botón que aparece a continuación e ingresa el código debajo:
              </p>
              <a href="${confirmationUrl}" style="
                display:inline-block;
                background-color:#2563EB;
                color:#FFFFFF;
                text-decoration:none;
                font-weight:600;
                font-size:16px;
                padding:12px 24px;
                border-radius:6px;
              ">
                Confirmar cuenta
              </a>
              <p style="
                color:#4B5563;
                font-size:16px;
                margin-top:32px;
              ">
                Este es tu código de confirmación:
                <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="
                color:#9CA3AF;
                font-size:14px;
                margin-top:8px;
              ">
                Nota: Este código expira en 10 minutos.
              </p>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Correo de confirmación enviado:", info.messageId);
  };
  static sendPasswordResetToken = async (user: IEmail) => {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/new-password`;
    const info = await transporter.sendMail({
      from: `DevFlow <no-reply@devflow.com>`,
      to: user.email,
      subject: "DevFlow - Restablece tu contraseña",
      text: `Hola ${user.name}, solicita restablecer tu contraseña usando: ${resetUrl}`,
      html: `
        <html>
          <body style="margin:0; padding:0; background-color:#F3F4F6;">
            <div style="
              max-width:600px;
              margin: 40px auto;
              background-color:#FFFFFF;
              border-radius:8px;
              font-family:Arial, sans-serif;
              padding:24px;
            ">
              <h2 style="
                color:#1F2937;
                font-size:24px;
                font-weight:700;
                margin-bottom:16px;
              ">
                Restablecer contraseña
              </h2>
              <p style="
                color:#4B5563;
                font-size:16px;
                margin-bottom:24px;
              ">
                ¡Hola, ${user.name}! Hemos recibido una solicitud para restablecer 
                tu contraseña en DevFlow. Haz clic en el botón a continuación 
                para continuar e ingresa el código debajo:
              </p>
              <a href="${resetUrl}" style="
                display:inline-block;
                background-color:#2563EB;
                color:#FFFFFF;
                text-decoration:none;
                font-weight:600;
                font-size:16px;
                padding:12px 24px;
                border-radius:6px;
              ">
                Restablecer contraseña
              </a>
              <p style="
                color:#4B5563;
                font-size:16px;
                margin-top:32px;
              ">
                Este es tu código de confirmación:
                <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="
                color:#9CA3AF;
                font-size:14px;
                margin-top:8px;
              ">
                Nota: Este código expira en 10 minutos.
              </p>
            </div>
          </body>
        </html>
      `,
    });
    console.log("Correo de restablecimiento enviado:", info.messageId);
  };
}
