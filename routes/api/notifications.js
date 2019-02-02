const router = require("express").Router();
const notificationsController = require("../../controllers/notificationsController");

//Matches with "/api/notifications"
router.route("/")
    .get(notificationsController.findAll)
    .post(notificationsController.create);

//Matches with "/api/notifications/:id"
router.route("/:id")
    .get(notificationsController.findById)
    .put(notificationsController.update)
    .delete(notificationsController.remove);

module.exports = router;