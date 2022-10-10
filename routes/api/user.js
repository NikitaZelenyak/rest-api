const express = require("express");
const { user: ctrl } = require("../../controllers/index");
const router = express.Router();
const { schema } = require("../../models/user");
const { validation, isAuthorized, upload } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../helpers/index");

router.patch(
  "/",
  isAuthorized,
  validation(schema.updateSubscriptionSchema),
  ctrlWrapper(ctrl.userUpdateSubscription)
);

router.patch(
  "/avatars",
  isAuthorized,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
