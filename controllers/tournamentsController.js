const tournament = require("../models/Tournament");

module.exports = {

    findAll: function(req, res) {
        tournament
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        tournament
            .findById(req.params.id)
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
        tournament
            .findOneAndUpdate({_id: req.params.id }, req.body)
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
        console.log(req.params);
        tournament
            .find({organizer: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByJudge: function (req, res) {
        tournament
            .find({'judges.user' : req.params.id }) 
            .populate('brackets')    
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

};