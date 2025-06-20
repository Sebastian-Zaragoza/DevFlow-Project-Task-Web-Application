import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const {
    GMAIL_OAUTH_CLIENT_ID,
    GMAIL_OAUTH_CLIENT_SECRET,
    GMAIL_OAUTH_REFRESH_TOKEN,
    GMAIL_USER
} = process.env!;

const oAuth2Client = new google.auth.OAuth2(
    GMAIL_OAUTH_CLIENT_ID!,
    GMAIL_OAUTH_CLIENT_SECRET!,
    "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: GMAIL_OAUTH_REFRESH_TOKEN! });

async function createTransporter() {
    const { token } = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: GMAIL_USER!,
            clientId: GMAIL_OAUTH_CLIENT_ID!,
            clientSecret: GMAIL_OAUTH_CLIENT_SECRET!,
            refreshToken: GMAIL_OAUTH_REFRESH_TOKEN!,
            accessToken: token!,
        },
    });
}

export async function sendEmail(opts: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}) {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
        from: `"DevFlow" <${GMAIL_USER}>`,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
    });
    return info;
}
