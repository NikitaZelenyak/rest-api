const express = require("express");
const { auth: ctrl } = require("../../controllers/index");
const router = express.Router();

const { validation, isAuthorized } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../helpers/index");
const { schema } = require("../../models/user");

router.post("/signup", validation(schema.joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(schema.joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", isAuthorized, ctrlWrapper(ctrl.currentUser));
router.get("/logout", isAuthorized, ctrlWrapper(ctrl.logout));

module.exports = router;
