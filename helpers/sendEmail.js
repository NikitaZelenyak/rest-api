const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  service: "meta",
  hosts: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "zeleniak.nikita@meta.ua",
    pass: META_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: " zeleniak.nikita@meta.ua" };
  try {
    await transport.sendMail(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = sendEmail;
