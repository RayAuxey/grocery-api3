const router = require("express").Router();
const UserController = require("../controllers/user_controller");

router.post("/signUp", UserController.signUp);
router.post("/signIn", UserController.signIn);

module.exports = router;
