const tournament = require("../models/Tournament");

module.exports = {

    findAll: function (req, res) {
        tournament
            .find(req.query)
            .populate('game')
            .populate('players.user')
            .populate('judges.user') 
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        tournament
            .findById(req.params.id)
            .populate('game')  
            .populate('players.user')
            .populate('judges.user') 
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    create: function (req, res) {
        tournament
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        console.log(req.body);
        tournament
            .findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        tournament
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByUserId: function (req, res) {
        tournament
            .find({ organizer: req.params.id })
            .populate('game')
            .populate('players.user')
            .populate('judges.user')  
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByJudge: function (req, res) {
        tournament
            .find({ 'judges.user': req.params.id })
            .populate('game')
            .populate('brackets')
            .populate({path: 'brackets', populate: {path: 'matches'}})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findByPlayer: function (req, res) {
        tournament
            .find({ 'players.user': req.params.id })
            .populate('game')
            .populate('brackets')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    subsVolunteer: function (req, res) {
        tournament
            .findByIdAndUpdate(req.params.id, { $push:{ judges: {"user": req.body.id, "status": 'pending'} }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    subsPlayer: function (req, res) {
        tournament
            .findByIdAndUpdate(req.params.id, { $push:{ players: {"user": req.body.id, "status": 'pending'} }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    updateStatus: function (req, res) {
        tournament
            .findByIdAndUpdate(req.params.id, {$set: {status: req.body.status}}, {new: true})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

};