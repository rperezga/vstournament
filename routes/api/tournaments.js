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

router.route("/byuser/:id")
    .get(tournamentsController.findByUserId);

router.route("/judge/:id")
    .get(tournamentsController.findByJudge);

router.route("/player/:id")
    .get(tournamentsController.findByPlayer);

router.route("/subsvolunteer/:id")
    .put(tournamentsController.subsVolunteer);

router.route("/subsplayer/:id")
    .put(tournamentsController.subsPlayer);

router.route("/status/:id")
    .put(tournamentsController.updateStatus);

router.route("/updatePlayerStatus/:id")
    .put( tournamentsController.updatePlayerStatus );

router.route("/updateJudgeStatus/:id")
    .put( tournamentsController.updateJudgeStatus );

router.route("/generateBrackets/:id")
    .put( tournamentsController.generateBrackets );

router.route("/advancePlayers/:id")
    .put( tournamentsController.advancePlayers );

router.route("/createResultNotification/:id")
    .put( tournamentsController.createResultNotification );

router.route("/createCommentaryNotification/:id")
    .put( tournamentsController.createCommentaryNotification );

module.exports = router;
