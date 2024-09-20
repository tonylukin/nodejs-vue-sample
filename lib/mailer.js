"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});
const sendMail = (subject, text) => {
    return transporter.sendMail({
        from: process.env.NOTIFICATION_EMAIL_FROM,
        to: process.env.NOTIFICATION_EMAIL,
        subject: subject,
        text: text,
    });
};
exports.sendMail = sendMail;
