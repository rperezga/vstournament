const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/tournaments"
router.route("/register")
  .post(usersController.registerUser);

router.route("/login")
  .post(usersController.loginUser);

router.route("/find/:id")
  .get(usersController.getUserById);

router.get("/find/:id", (req, res) => {
  User.findOne(req.params.id.id).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "User not found" });
    } else {
      return res.status(200).json({ user: user })
    }
  });
 });

module.exports = router;

