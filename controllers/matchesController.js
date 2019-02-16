const match = require("../models/Match");

module.exports = {

    findAll: function(req, res) {
        match
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        match
            .findById(req.params.id).populate('player1.player').populate('player2.player')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    create: function (req, res) {
        match
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) { 
        if(req.body.player1 > req.body.player2){
            var p1win = true
            var p2win = false            
        }else{
            var p1win = false
            var p2win = true
        }
        match
            .findOneAndUpdate({_id: req.params.id }, 
                { $set: { 'player1.score': req.body.player1, 'player1.isWinner': p1win, 'player2.score': req.body.player2, 'player2.isWinner': p2win, status: 'finished'} } 
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        match
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};