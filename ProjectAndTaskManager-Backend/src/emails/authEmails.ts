import {sendEmail} from "../config/nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface IEmail      { email: string; name: string; token: string; }
interface IEmailAddDeleteMember { email: string; name: string; projectName: string; }
interface IEmailNotifyMembers   { email: string; name: string; projectName: string; taskName: string; }

export class AuthEmails {
  static sendConfirmationEmail = async (user: IEmail) => {
    const url = `${process.env.FRONTEND_URL}/auth/confirm-account`;
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Confirma tu cuenta",
      text:  `Hola ${user.name}, confirma tu cuenta aquí: ${url}\nCódigo: ${user.token}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Confirma tu cuenta</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hola ${user.name}, gracias por registrarte.  
                Para activarla, haz clic en este botón:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Confirmar cuenta
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Tu código de verificación: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                Este código expira en 10 minutos.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const url = `${process.env.FRONTEND_URL}/auth/new-password`;
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Restablece tu contraseña",
      text:  `Hola ${user.name}, restablece tu contraseña aquí: ${url}\nCódigo: ${user.token}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Restablecer contraseña</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hola ${user.name}, haz clic en el botón para continuar:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Restablecer contraseña
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Tu código: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                Expira en 10 minutos.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  };

  static addMemberToProject = async (user: IEmailAddDeleteMember) => {
    const url = process.env.FRONTEND_URL!;
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Nuevo miembro en proyecto",
      text:  `Hola ${user.name}, te agregaron al proyecto "${user.projectName}". Visita: ${url}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Asignación a proyecto</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hola ${user.name}, fuiste agregado al proyecto:
                <strong>${user.projectName}</strong>
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Ver proyecto
              </a>
            </div>
          </body>
        </html>
      `,
    });
  };

  static deleteMemberToProject = async (user: IEmailAddDeleteMember) => {
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Eliminado de proyecto",
      text:  `Hola ${user.name}, fuiste eliminado del proyecto "${user.projectName}".`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Eliminación de proyecto</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hola ${user.name}, fuiste eliminado de "${user.projectName}". ¡Anímate a crear otro!
              </p>
            </div>
          </body>
        </html>
      `,
    });
  };

  static createTaskNotify = async (user: IEmailNotifyMembers) => {
    const url = process.env.FRONTEND_URL!;
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Nueva tarea asignada",
      text:  `Hola ${user.name}, nueva tarea "${user.taskName}" en "${user.projectName}".`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Tarea nueva</h2>
              <p style="color:#4B5563;font-size:16px;">
                ¡Hola ${user.name}! Te asignaron la tarea:
                <strong>${user.taskName}</strong> en
                <strong>${user.projectName}</strong>.
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Ver tarea
              </a>
            </div>
          </body>
        </html>
      `,
    });
  };

  static editTaskNotify = async (user: IEmailNotifyMembers) => {
    const url = process.env.FRONTEND_URL!;
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Asignación a una tarea existente",
      text:  `Hola ${user.name}, la tarea "${user.taskName}" en "${user.projectName}" se te ha sido asignada.`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Tarea nueva asignada</h2>
              <p style="color:#4B5563;font-size:16px;">
                La tarea:
                <strong>${user.taskName}</strong> en
                <strong>${user.projectName}</strong> se te ha sido asignada.
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Ver cambios
              </a>
            </div>
          </body>
        </html>
      `,
    });
  };

  static deleteTaskNotify = async (user: IEmailNotifyMembers) => {
    await sendEmail({
      to: user.email,
      subject: "DevFlow – Tarea eliminada",
      text:  `Hola ${user.name}, la tarea "${user.taskName}" en "${user.projectName}" fue eliminada.`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Tarea eliminada</h2>
              <p style="color:#4B5563;font-size:16px;">
                La tarea:
                <strong>${user.taskName}</strong> en
                <strong>${user.projectName}</strong> ha sido eliminada.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  };
}
