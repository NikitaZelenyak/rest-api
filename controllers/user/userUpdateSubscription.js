const { User } = require("../../models/user");

const userUpdateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({
    status: "successes",
    code: 200,
    result: {
      subscription,
    },
  });
};

module.exports = userUpdateSubscription;
