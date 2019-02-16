const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/tournaments"
router.route("/register")
  .post(usersController.registerUser);

router.route("/login")
  .post(usersController.loginUser);

router.route("/find/:id")
  .get(usersController.getUserById);

  router.route("/:id")
  .put(usersController.update);

module.exports = router;

