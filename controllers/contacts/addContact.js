const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "create",
    code: 201,
    data: {
      result: contact,
    },
  });
};

module.exports = addContact;
