import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const sendMail = (subject: string, text: string) => {
    return transporter.sendMail({
        from: process.env.NOTIFICATION_EMAIL_FROM,
        to: process.env.NOTIFICATION_EMAIL,
        subject: subject,
        text: text,
    });
}
