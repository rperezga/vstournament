/*** Require
***/

const underscore = require( 'underscore' );
const tournamentTemplates = require( '../tournamentTemplates' );
const keysConfig = require( '../config/keys' );
const mongoose = require( 'mongoose' );
const models = require( '../models' );
const tournament = require("../models/Tournament");


/*** FUNCTION debugGroup()
***/

const debugGroup = function( label ) {
    console.group( `\n# ${label}` );
}


/*** FUNCTION debugGroupEnd()
***/

const debugGroupEnd = function() {
    console.groupEnd();
    console.log();
}


/*** FUNCTION debugValue()
***/

const debugValue = function( label , value ) {
    console.group( `[DEBUG] ${ label }:` );
    console.debug( value );
    console.groupEnd();
}


/*** FUNCTION debugInfo()
***/

const debugInfo = function( message ) {
    console.log( `[INFO] ${ message }` );
}


/*** FUNCTION debugError()
***/

const debugError = function( error ) {
    console.log( `[ERROR] ${ error.message }:` );
    console.log( `[ERROR TRACE] ${ error.stack }:` );
}











/*** Export
***/

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
            .populate({path: 'brackets', populate: {path: 'matches'}})
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
    },

    updatePlayerStatus: async function( request , response ) {
        try {
            var tournamentId = request.params.id;
            var requestPlayer = request.body.player;
            // query tournament
            var tournament = await models.Tournament.findById( tournamentId );
            // find player to update
            var player = tournament.players.find(
                ( player ) => ( player.user.toString() === requestPlayer.user )
            );
            // update player
            player.status = requestPlayer.status;
            // save tournament
            tournament = await tournament.save();
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.toString() } );
        }
    } ,

    updateJudgeStatus: async function( request , response ) {
        debugGroupEnd( 'updateJudgeStatus()' );

        try {
            var tournamentId = request.params.id;
            var requestJudge = request.body.judge;
            debugValue( 'tournamentId' , tournamentId );
            debugValue( 'requestJudge' , requestJudge );
            // query tournament
            var tournament = await models.Tournament.findById( tournamentId );
            // find judge to update
            var judge = tournament.judges.find(
                ( judge ) => ( judge.user.toString() === requestJudge.user )
            );
            // update judge
            judge.status = requestJudge.status;
            debugValue( 'requestJudge' , requestJudge );
            // save tournament
            tournament = await tournament.save();
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.message } );
        }

        debugGroupEnd();
    }

};
