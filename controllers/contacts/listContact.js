const { Contact } = require("../../models/contact");

const listContact = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;

  const skip = (page - 1) * limit;
  const contacts = favorite
    ? await Contact.find(
        { owner: _id, favorite: true },
        "-createdAt -updatedAt",
        {
          skip,
          limit: Number(limit),
        }
      ).populate("owner", "email _id")
    : await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
      }).populate("owner", "email _id");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContact;
