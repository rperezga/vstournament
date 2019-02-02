const router = require("express").Router();
const bracketsController = require("../../controllers/bracketsController");

//Matches with "/api/brackets"
router.route("/")
    .get(bracketsController.findAll)
    .post(bracketsController.create);

//Matches with "/api/brackets/:id"
router.route("/:id")
    .get(bracketsController.findById)
    .put(bracketsController.update)
    .delete(bracketsController.remove);

module.exports = router;