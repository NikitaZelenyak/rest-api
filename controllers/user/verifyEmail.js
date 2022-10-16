const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const verifyEmail = async (req, res) => {
  const verificationToken = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user || user.verify) {
    throw NotFound;
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verify successes",
  });
};
module.exports = verifyEmail;
