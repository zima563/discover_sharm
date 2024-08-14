import nodemailer from "nodemailer";
import { generateEmailTemplateOrder } from "./templete.gmail.js";

export const sendEmailOrderConfirm = async (bookingDetails) => {
  const { email } = bookingDetails;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"discover_sharm" <${process.env.EMAIL_NAME}>`, // sender address
      to: email,
      subject: "Order Confirmation", // Subject line
      html: generateEmailTemplateOrder(bookingDetails), // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
