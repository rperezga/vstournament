const router = require("express").Router();
const tournamentsController = require("../../controllers/tournamentsController");

//Matches with "/api/tournaments"
router.route("/")
    .get(tournamentsController.findAll)
    .post(tournamentsController.create);

//Matches with "/api/tournaments/:id"
router.route("/:id")
    .get(tournamentsController.findById)
    .put(tournamentsController.update)
    .delete(tournamentsController.remove);

module.exports = router;