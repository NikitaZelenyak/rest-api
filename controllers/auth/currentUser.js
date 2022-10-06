const currentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "successes",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = currentUser;
