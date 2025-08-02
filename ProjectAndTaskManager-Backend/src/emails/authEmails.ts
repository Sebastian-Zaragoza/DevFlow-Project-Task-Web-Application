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
      subject: "DevFlow – Confirm your account",
      text:  `Hello ${user.name}, confirm your account here: ${url}\nCode: ${user.token}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Confirm your account</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, thank you for registering.  
                To activate it, click this button:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Confirm account
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Your verification code: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                This code expires in 10 minutes.
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
      subject: "DevFlow – Reset your password",
      text:  `Hello ${user.name}, reset your password here: ${url}\nCode: ${user.token}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Reset password</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, click the button to continue:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Reset password
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Your code: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                Expires in 10 minutes.
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
      subject: "DevFlow – New member in project",
      text:  `Hello ${user.name}, you were added to the project "${user.projectName}". Visit: ${url}`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Project assignment</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, you were added to the project:
                <strong>${user.projectName}</strong>
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                View project
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
      subject: "DevFlow – Removed from project",
      text:  `Hello ${user.name}, you were removed from the project "${user.projectName}".`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Project removal</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, you were removed from "${user.projectName}". Keep up the good work and create another one!
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
      subject: "DevFlow – New task assigned",
      text:  `Hello ${user.name}, new task "${user.taskName}" in "${user.projectName}".`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">New task</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}! You were assigned the task:
                <strong>${user.taskName}</strong> in
                <strong>${user.projectName}</strong>.
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                View task
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
      subject: "DevFlow – Assignment to an existing task",
      text:  `Hello ${user.name}, the task "${user.taskName}" in "${user.projectName}" has been assigned to you.`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">New task assigned</h2>
              <p style="color:#4B5563;font-size:16px;">
                The task:
                <strong>${user.taskName}</strong> in
                <strong>${user.projectName}</strong> has been assigned to you.
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                View changes
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
      subject: "DevFlow – Task deleted",
      text:  `Hello ${user.name}, the task "${user.taskName}" in "${user.projectName}" was deleted.`,
      html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Task deleted</h2>
              <p style="color:#4B5563;font-size:16px;">
                The task:
                <strong>${user.taskName}</strong> in
                <strong>${user.projectName}</strong> has been deleted.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  };
}
