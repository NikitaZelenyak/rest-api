const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers/index");
const { v4: uuidv4 } = require("uuid");
const { BadRequest } = require("http-errors");

const reSendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const verificationToken = uuidv4();
  const mail = {
    to: email,
    subject: "Validate your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">CLick for validate</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
    verificationToken,
  });
};
module.exports = reSendVerifyEmail;
