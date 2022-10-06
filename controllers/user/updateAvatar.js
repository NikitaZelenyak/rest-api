const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    const uploadResult = path.join(avatarsDir, avatarName);
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).write(uploadResult);
    await fs.unlink(tempUpload);
    const avatarURL = path.join("avatars", uploadResult);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      status: "successes",
      user: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = updateAvatar;
