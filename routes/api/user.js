const express = require("express");
const { user: ctrl } = require("../../controllers/index");
const router = express.Router();
const { schema } = require("../../models/user");
const { validation, isAuthorized } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../helpers/index");

router.patch(
  "/",
  isAuthorized,
  validation(schema.updateSubscriptionSchema),
  ctrlWrapper(ctrl.userUpdateSubscription)
);

module.exports = router;
