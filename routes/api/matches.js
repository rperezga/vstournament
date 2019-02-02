const router = require("express").Router();
const matchesController = require("../../controllers/matchesController");

//Matches with "/api/matches"
router.route("/")
    .get(matchesController.findAll)
    .post(matchesController.create);

//Matches with "/api/matches/:id"
router.route("/:id")
    .get(matchesController.findById)
    .put(matchesController.update)
    .delete(matchesController.remove);

module.exports = router;