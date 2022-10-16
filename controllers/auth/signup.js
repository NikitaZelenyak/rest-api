const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers/index");
const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const mail = {
    to: email,
    subject: "Validate your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">CLick for validate</a>`,
  };
  await sendEmail(mail);
  await User.create({
    email,
    password: hashPassword,
    verificationToken,
    subscription,
    avatarURL,
  });

  res.status(201).json({
    status: "successes",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
