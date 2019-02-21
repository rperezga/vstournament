const match = require("../models/Match");


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


module.exports = {

    findAll: function(req, res) {
        match
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        match
            .findById(req.params.id).populate('player1.user').populate('player2.user')
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
        debugGroup( 'update()' );

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

        debugGroupEnd();
    },

    remove: function (req, res) {
        match
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
