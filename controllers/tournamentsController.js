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


/*** FUNCTION asyncForEach()

[Reference](https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404)

***/

const asyncForEach = async function( array , callback ) {
    for ( let index = 0 ; index < array.length ; index++ ) {
        await callback( array[ index ] , index , array );
    }
}


/*** FUNCTION asyncMap()
***/

const asyncMap = async function( array , callback ) {
    result = [];
    for ( let index = 0 ; index < array.length ; index++ ) {
        result.push( await callback( array[ index ] , index , array ) );
    }
    return result;
}


/*** FUNCTION applyAdvanceRule()

Helper function. Assumes data has already been fetched.

TODO: implement double elimination logic.

***/

const applyAdvanceRule = function ( tournament , advanceRule , updatedDocumentIds , updatedDocuments ) {
    debugGroup( 'FUNCTION applyAdvanceRule()' );
    // debugValue( 'tournament' , tournament );
    // debugValue( 'advanceRule' , advanceRule );

    var match = tournament.brackets[ advanceRule.bracketIndex ].matches[ advanceRule.matchIndex ];
    // debugValue( 'match' , match );

    // check match is finished and has a winner
    if ( match.status !== 'finished' ) {
        debugGroupEnd();
        throw new RangeError( 'Match should be finished.' )
    }
    if ( !match.player1.isWinner && !match.player2.isWinner) {
        debugGroupEnd();
        throw new RangeError( 'Match should should have a winner.' )
    }

    // check winner and loser
    var winnerPlayer;
    var loserPlayer;
    if ( match.player1.isWinner ) {
        // debugInfo( 'Player1 wins.' );
        winnerPlayer = match.player1;
        loserPlayer = match.player2;
    }
    else {
        // debugInfo( 'Player 2 wins.' );
        winnerPlayer = match.player2;
        loserPlayer = match.player1;
    }

    // if the final match, only add results
    if (
        ( advanceRule.winnerToBracketIndex === undefined ) &&
        ( advanceRule.winnerToMatchIndex === undefined )
    ) {
        // debugInfo( 'Final match.' );
        // add loser result
        if ( !loserPlayer.isBye ) {
            let newResult = {
                user: loserPlayer.user ,
                position: advanceRule.loserResult
            };
            tournament.result.unshift( newResult );
            // flag tournament for save
            if ( updatedDocumentIds.indexOf( tournament.id ) === -1 ) {
                updatedDocumentIds.push( tournament.id );
                updatedDocuments.push( tournament );
            }
        }

        // add winner result
        if ( !winnerPlayer.isBye ) {
            let newResult = {
                user: winnerPlayer.user ,
                position: advanceRule.winnerResult
            };
            tournament.result.unshift( newResult );
            // flag tournament for save
            if ( updatedDocumentIds.indexOf( tournament.id ) === -1 ) {
                updatedDocumentIds.push( tournament.id );
                updatedDocuments.push( tournament );
            }
        }
    }
    // add result of loser, advance winner to next match
    else {
        // debugInfo( `Loser is eliminated. Position ${ advanceRule.loserResult }.` );
        // add loser result
        if ( !loserPlayer.isBye ) {
            let newResult = {
                user: loserPlayer.user ,
                position: advanceRule.loserResult
            };
            tournament.result.unshift( newResult );
            // flag tournament for save
            if ( updatedDocumentIds.indexOf( tournament.id ) === -1 ) {
                updatedDocumentIds.push( tournament.id );
                updatedDocuments.push( tournament );
            }
        }

        // debugInfo( 'Winner advances.' );
        // advance winner to next match
        let nextMatch = tournament.brackets[ advanceRule.winnerToBracketIndex ].matches[ advanceRule.winnerToMatchIndex ];
        if ( !winnerPlayer.isBye ) {
            nextMatch[ advanceRule.winnerToPlayer ].user = winnerPlayer.user;
        }
        else {
            nextMatch[ advanceRule.winnerToPlayer ].isBye = true;
        }
        // check if next match is ready
        if (
            ( nextMatch.player1.user || nextMatch.player1.isBye ) &&
            ( nextMatch.player2.user || nextMatch.player2.isBye )
        ) {
            // debugInfo( 'Next match is ready.' );
            nextMatch.status = 'ready';
        }
        // debugValue( 'nextMatch' , nextMatch );
        // flag match for save
        if ( updatedDocumentIds.indexOf( nextMatch.id ) === -1 ) {
            updatedDocumentIds.push( nextMatch.id );
            updatedDocuments.push( nextMatch );
        }

    }

    // debugValue( 'tournament' , tournament );
    debugGroupEnd();
}


/*** FUNCTION createBrackets()
***/

const createBrackets = async function( tournamentId ) {
    debugGroup( 'FUNCTION createBrackets()' );
    // debugValue( 'tournamentId' , tournamentId );

    var tournament = await models.Tournament.findById( tournamentId );
    // debugValue( 'tournament' , tournament );
    var tournamentTemplate = tournamentTemplates[ tournament.tournamentTemplate ];
    // debugValue( 'tournamentTemplate' , tournamentTemplate );

    // create bracket documents (one document per bracket)
    var newBrackets = tournamentTemplate.brackets.map(
        ( tournamentTemplateBracket ) => {
            let newBracket = new models.Bracket();
            newBracket.name = tournamentTemplateBracket.name;
            return newBracket;
        }
    )
    // debugValue( 'newBrackets' , newBrackets );

    // create match documents (array of documents per bracket)
    var newMatchess = tournamentTemplate.brackets.map(
        ( tournamentTemplateBracket ) => tournamentTemplateBracket.matches.map(
            ( tournamentTemplateMatch ) => {
                let newMatch = models.Match();
                newMatch.name = tournamentTemplateMatch.name;
                return newMatch;
            }
        )
    );
    // debugValue( 'newMatchess' , newMatchess );

    // assign matches to each bracket
    newMatchess.forEach(
        ( newMatches , newMatchesIndex ) => {
            newMatches.forEach(
                ( newMatch ) => {
                    newBrackets[ newMatchesIndex ].matches.push( newMatch._id );
                }
            );
        }
    );
    // debugValue( 'newBrackets' , newBrackets );

    // assign brackets to tournament
    newBrackets.forEach(
        ( newBracket ) => {
            tournament.brackets.push( newBracket._id );
        }
    );
    // debugValue( 'tournament' , tournament );

    // save matches
    await asyncForEach(
        newMatchess ,
        async ( newMatches ) => {
            await asyncForEach(
                newMatches ,
                async ( newMatch ) => {
                    let savedMatch = await newMatch.save();
                    debugInfo( `Saved match ${ savedMatch.id }.` );
                }
            )

        }

    );
    // debugValue( 'newMatchess' , newMatchess );

    // save brackets
    await asyncForEach(
        newBrackets ,
        async ( newBracket ) => {
            let savedBracket = await newBracket.save();
            debugInfo( `Saved bracket ${ savedBracket.id }.` );
        }
    );
    // debugValue( 'newBrackets' , newBrackets );

    // save tournament
    var savedTournament = await tournament.save();
    // debugInfo( `Saved tournament ${ savedTournament.id }.` );

    // debugValue( 'savedTournament' , savedTournament );
    debugGroupEnd();
    return savedTournament;
}


/*** FUNCTION assignJudges()
***/

const assignJudges = async function( tournamentId ) {
    debugGroup( 'FUNCTION assignJudges()' );
    // debugValue( 'tournamentId' , tournamentId );

    var tournament = await models.Tournament.findById( tournamentId ).populate( 'brackets' );
    // debugValue( 'tournament' , tournament );
    var tournamentTemplate = tournamentTemplates[ tournament.tournamentTemplate ];
    // debugValue( 'tournamentTemplate' , tournamentTemplate );
    var updatedDocumentIds = [];
    var updatedDocuments = [];

    // START: split judges

    // filter judges by status
    var tournamentJudgesBuffer = tournament.judges.filter(
        ( tournamentJudge ) => ( tournamentJudge.status === 'approved' )
    );
    // debugValue( 'tournamentJudgesBuffer' , tournamentJudgesBuffer );

    // shuffle judges
    var tournamentJudgesBuffer2 = underscore.shuffle( tournamentJudgesBuffer );
    // debugValue( 'tournamentJudgesBuffer2' , tournamentJudgesBuffer2 );

    // split judges (array of judges per bracket)
    var tournamentJudgesBuffer3Length = tournamentTemplate.bracketCount;
    var tournamentJudgesBuffer3 = [];
    for (
        let tournamentJudgesBuffer3Index = 0 ;
        tournamentJudgesBuffer3Index < tournamentJudgesBuffer3Length ;
        tournamentJudgesBuffer3Index++
    ) {
        tournamentJudgesBuffer3.push(
            tournamentJudgesBuffer2.filter(
                ( tournamentJudge , tournamentJudgeIndex ) => (
                    ( ( tournamentJudgeIndex % tournamentJudgesBuffer3Length ) === tournamentJudgesBuffer3Index )
                )
            )
        )
    }
    // debugValue( 'tournamentJudgesBuffer3' , tournamentJudgesBuffer3 );

    // END: split judges

    // assign judges to each bracket
    tournamentJudgesBuffer3.forEach(
        ( tournamentJudges , tournamentJudgesIndex ) => {
            tournamentJudges.forEach(
                ( tournamentJudge ) => {
                    let bracket = tournament.brackets[ tournamentJudgesIndex ];
                    bracket.judges.push( tournamentJudge.user );
                    // flag bracket for save
                    if ( updatedDocumentIds.indexOf( bracket.id ) === -1 ) {
                        updatedDocumentIds.push( bracket.id );
                        updatedDocuments.push( bracket );
                    }
                }
            );
        }
    );
    // debugValue( 'tournament' , tournament );

    // save updated documents
    await asyncForEach(
        updatedDocuments ,
        async ( updatedDocument ) => {
            let savedDocument = await updatedDocument.save();
            debugInfo( `Saved document ${ savedDocument.id }.` );
        }
    );

    // debugValue( 'tournament' , tournament );
    debugGroupEnd();
    return tournament;
}


/*** FUNCTION assignAndSeedPlayers()
***/

const assignAndSeedPlayers = async function( tournamentId ) {
    debugGroup( 'FUNCTION assignAndSeedPlayers()' );
    // debugValue( 'tournamentId' , tournamentId );

    var tournament = await models.Tournament.findById( tournamentId )
        .populate(
            {
                path: 'brackets' ,
                populate: {
                    path: 'matches'
                }
            }
        );
    // debugValue( 'tournament' , tournament );
    // debugValue( 'tournament' , JSON.stringify( tournament , null , 4 ) );
    var tournamentTemplate = tournamentTemplates[ tournament.tournamentTemplate ];
    // debugValue( 'tournamentTemplate' , tournamentTemplate );
    var updatedDocumentIds = [];
    var updatedDocuments = [];

    // START: sort players from top seed to bottom seed

    // filter players by status
    var tournamentPlayersBuffer = tournament.players.filter(
        ( tournamentPlayer ) => ( tournamentPlayer.status === 'approved' )
    );
    // debugValue( 'tournamentPlayersBuffer' , tournamentPlayersBuffer );

    // get maximum seed rank
    var maxSeedRank = tournamentPlayersBuffer.reduce(
        ( accumulator , tournamentPlayer ) => (
            ( tournamentPlayer.seedRank > accumulator ) ?
            tournamentPlayer.seedRank :
            accumulator
        ) ,
        0
    );
    // debugValue( 'maxSeedRank' , maxSeedRank );

    // split players (array of players per seed rank, seed rank in descending order)
    var tournamentPlayersBuffer2 = [];
    for (
        let tournamentPlayersBuffer2Index = maxSeedRank ;
        tournamentPlayersBuffer2Index >= 0 ;
        tournamentPlayersBuffer2Index--
    ) {
        tournamentPlayersBuffer2.push(
            tournamentPlayersBuffer.filter(
                ( tournamentPlayer ) => ( tournamentPlayer.seedRank === tournamentPlayersBuffer2Index )
            )
        );
    }
    // debugValue( 'tournamentPlayersBuffer2' , tournamentPlayersBuffer2 );

    // shuffle each array of players
    var tournamentPlayersBuffer3 = tournamentPlayersBuffer2.map(
        ( tournamentPlayers ) => underscore.shuffle( tournamentPlayers )
    );
    // debugValue( 'tournamentPlayersBuffer3' , tournamentPlayersBuffer3 );

    // concatenate arrays of players, results in array of players ordered by seed rank
    var tournamentPlayersBuffer4 = tournamentPlayersBuffer3.reduce(
        ( accumulator , tournamentPlayers ) => accumulator.concat( tournamentPlayers ) ,
        []
    );
    // debugValue( 'tournamentPlayersBuffer4' , tournamentPlayersBuffer4 );

    // END: sort players from top seed to bottom seed

    // assign players to matches according to seed rules
    tournamentTemplate.seedRules.forEach(
        ( seedRule , seedRuleIndex ) => {
            let tournamentPlayer = tournamentPlayersBuffer4[ seedRuleIndex ];
            let bracket = tournament.brackets[ seedRule.bracketIndex ];
            let match = tournament.brackets[ seedRule.bracketIndex ].matches[ seedRule.matchIndex ];

            // if no more players, assign byes
            if ( !tournamentPlayer ) {
                // assign bye to match
                match[ seedRule.player ].isBye = true;
                // flag match for save
                if ( updatedDocumentIds.indexOf( match.id ) === -1 ) {
                    updatedDocumentIds.push( match.id );
                    updatedDocuments.push( match );
                }
            }
            else {
                // assign player to bracket
                bracket.players.push( tournamentPlayer.user );
                // flag bracket for save
                if ( updatedDocumentIds.indexOf( bracket.id ) === -1 ) {
                    updatedDocumentIds.push( bracket.id );
                    updatedDocuments.push( bracket );
                }

                // assign player to match
                match[ seedRule.player ].user = tournamentPlayer.user;
                // flag match for save
                if ( updatedDocumentIds.indexOf( match.id ) === -1 ) {
                    updatedDocumentIds.push( match.id );
                    updatedDocuments.push( match );
                }
            }

            // check if next match is ready
            if (
                ( match.player1.user || match.player1.isBye ) &&
                ( match.player2.user || match.player2.isBye )
            ) {
                // debugInfo( 'Match is ready.' );
                match.status = 'ready';
            }
        }
    );
    // debugValue( 'tournament' , tournament );

    // save updated documents
    await asyncForEach(
        updatedDocuments ,
        async ( updatedDocument ) => {
            let savedDocument = await updatedDocument.save();
            debugInfo( `Saved document ${ savedDocument.id }.` );
        }
    );

    // debugValue( 'tournament' , tournament );
    debugGroupEnd();
    return tournament;
}


/*** FUNCTION advanceByes()
***/

const advanceByes = async function( tournamentId ) {
    debugGroup( 'FUNCTION advanceByes()' );
    // debugValue( 'tournamentId' , tournamentId );

    var tournament = await models.Tournament.findById( tournamentId )
        .populate(
            {
                path: 'brackets' ,
                populate: {
                    path: 'matches'
                }
            }
        );
    // debugValue( 'tournament' , tournament );
    // debugValue( 'tournament' , JSON.stringify( tournament , null , 4 ) );
    var tournamentTemplate = tournamentTemplates[ tournament.tournamentTemplate ];
    // debugValue( 'tournamentTemplate' , tournamentTemplate );
    var updatedDocumentIds = [];
    var updatedDocuments = [];

    // advance all byes
    tournament.brackets.forEach(
        ( bracket , bracketIndex ) => {
            bracket.matches.forEach(
                ( match , matchIndex ) => {
                    // if match has a bye, the other player wins
                    if ( match.player1.isBye ) {
                        match.player2.isWinner = true;
                        match.status = 'finished';
                        // flag match for save
                        if ( updatedDocumentIds.indexOf( match.id ) === -1 ) {
                            updatedDocumentIds.push( match.id );
                            updatedDocuments.push( match );
                        }
                    }
                    else if ( match.player2.isBye ) {
                        // also applies if both players are byes
                        match.player1.isWinner = true;
                        match.status = 'finished';
                        // flag match for save
                        if ( updatedDocumentIds.indexOf( match.id ) === -1 ) {
                            updatedDocumentIds.push( match.id );
                            updatedDocuments.push( match );
                        }
                    }

                    if ( match.status === 'finished' ) {
                        // find advance rule
                        let advanceRule = tournamentTemplate.advanceRules.find(
                            ( advanceRule ) => (
                                ( advanceRule.bracketIndex === bracketIndex ) &&
                                ( advanceRule.matchIndex === matchIndex )
                            )
                        );

                        // apply advance rule
                        applyAdvanceRule( tournament , advanceRule , updatedDocumentIds , updatedDocuments );
                    }
                }
            );
        }
    );

    // save updated documents
    await asyncForEach(
        updatedDocuments ,
        async ( updatedDocument ) => {
            let savedDocument = await updatedDocument.save();
            debugInfo( `Saved document ${ savedDocument.id }.` );
        }
    );

    // debugValue( 'tournament' , tournament );
    debugGroupEnd();
    return tournament;
}


/*** FUNCTION advancePlayersMain()
***/

const advancePlayersMain = async function( tournamentId , bracketId , matchId ) {
    debugGroup( 'FUNCTION advancePlayersMain()' );
    debugValue( 'tournamentId' , tournamentId );
    debugValue( 'matchId' , matchId );

    var tournament = await models.Tournament.findById( tournamentId )
        .populate(
            {
                path: 'brackets' ,
                populate: {
                    path: 'matches'
                }
            }
        );
    // debugValue( 'tournament' , tournament );
    var tournamentTemplate = tournamentTemplates[ tournament.tournamentTemplate ];
    // debugValue( 'tournamentTemplate' , tournamentTemplate );
    var updatedDocumentIds = [];
    var updatedDocuments = [];

    // find bracket and match index
    /*
    var isMatchFound = false;
    var bracketIndex = 0;
    var matchIndex = 0;
    while( !isMatchFound && ( bracketIndex < tournament.brackets.length ) ) {
        while( !isMatchFound && ( matchIndex < tournament.brackets[ bracketIndex ].length ) ) {
            if ( tournament[ bracketIndex ][ matchIndex ].id === matchId ) {
                isMatchFound = true;
            }
        }
    }
    */
    var bracketIndex = tournament.brackets.findIndex(
        ( bracket ) => ( bracket.id === bracketId )
    );
    var matchIndex = tournament.brackets[ bracketIndex ].matches.findIndex(
        ( match ) => ( match.id === matchId )
    );
    debugValue( 'bracketIndex' , bracketIndex );
    debugValue( 'matchIndex' , matchIndex );

    // find advance rule
    var advanceRule = tournamentTemplate.advanceRules.find(
        ( advanceRule ) => (
            ( advanceRule.bracketIndex === bracketIndex ) &&
            ( advanceRule.matchIndex === matchIndex )
        )
    );

    // apply advance rule
    applyAdvanceRule( tournament , advanceRule , updatedDocumentIds , updatedDocuments );

    // save updated documents
    await asyncForEach(
        updatedDocuments ,
        async ( updatedDocument ) => {
            let savedDocument = await updatedDocument.save();
            debugInfo( `Saved document ${ savedDocument.id }.` );
        }
    );

    // debugValue( 'tournament' , tournament );
    debugGroupEnd();
    return tournament;
}


/*** FUNCTION createResultNotificationMain()
***/

const createResultNotificationMain = async function( tournamentId , bracketId , matchId ) {
    debugGroup( 'FUNCTION createResultNotificationMain()' );
    // debugValue( 'tournamentId' , tournamentId );
    // debugValue( 'bracketId' , bracketId );
    // debugValue( 'matchId' , matchId );

    var tournament = await models.Tournament.findById( tournamentId );
    var bracket = await models.Bracket.findById( bracketId );
    var match = await models.Match.findById( matchId );
    debugValue( 'tournament' , tournament );
    debugValue( 'bracket' , bracket );
    debugValue( 'match' , match );
    var doCreateNotification = true;

    // check match is finished
    if ( match.status !== 'finished' ) {
        doCreateNotification = false;
        // debugGroupEnd();
        // throw new RangeError( 'Match should be finished.' )
    }
    debugValue( 'doCreateNotification' , doCreateNotification );

    // check match has a winner
    if ( !match.player1.isWinner && !match.player2.isWinner) {
        doCreateNotification = false;
        // debugGroupEnd();
        // throw new RangeError( 'Match should should have a winner.' )
    }
    debugValue( 'doCreateNotification' , doCreateNotification );

    // check match has no byes
    if ( match.player1.isBye || match.player2.isBye ) {
        doCreateNotification = false;
    }
    debugValue( 'doCreateNotification' , doCreateNotification );

    if ( doCreateNotification ) {
        // find additional details
        await match.populate( 'player1.user' ).execPopulate();
        await match.populate( 'player2.user' ).execPopulate();
        debugValue( 'match' , match );

        // create new notification
        newNotification = models.Notification();
        newNotification.date = new Date();
        newNotification.notificationType = 'result';
        newNotification.tournament = tournament._id;
        newNotification.bracket = bracket._id;
        newNotification.match = match._id;
        // newNotification.message = `[${ bracket.name }] [${ match.name }] ${ match.player1.user.playerName } : ${ match.player1.score } – ${ match.player2.score } : ${ match.player2.user.playerName }`
        newNotification.message = `${ match.name }: ${ match.player1.user.playerName } vs ${ match.player2.user.playerName }: ${ match.player1.score }–${ match.player2.score }`;
        debugValue( 'newNotification' , newNotification );

        // assign notification to tournament
        tournament.notifications.push( newNotification._id );

        // save documents
        var savedNotification = await newNotification.save();
        var savedTournament = await tournament.save();

        debugGroupEnd();
        return savedTournament;
    }
    else {
        debugGroupEnd();
        return tournament;
    }

}


/*** FUNCTION createCommentaryNotificationMain()
***/

const createCommentaryNotificationMain = async function( tournamentId , commentary ) {
    debugGroup( 'FUNCTION createCommentaryNotificationMain()' );
    debugValue( 'tournamentId' , tournamentId );
    debugValue( 'commentary' , commentary );

    var tournament = await models.Tournament.findById( tournamentId );
    debugValue( 'tournament' , tournament );

    // create new notification
    newNotification = models.Notification();
    newNotification.date = new Date();
    newNotification.notificationType = 'commentary';
    newNotification.tournament = tournament._id;
    newNotification.message = commentary;
    debugValue( 'newNotification' , newNotification );

    // assign notification to tournament
    tournament.notifications.push( newNotification._id );

    // save documents
    var savedNotification = await newNotification.save();
    var savedTournament = await tournament.save();

    debugGroupEnd();
    return savedTournament;
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
            .populate({path: 'brackets', populate: {path: 'matches', populate: {path:'player1.user'}}})
            .populate({path: 'brackets', populate: {path: 'matches', populate: {path:'player2.user'}}})
            .populate('players.user')
            .populate('judges.user')
            .populate('notifications')
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
            .populate(
                {
                    path: 'brackets',
                    populate: {
                        path: 'matches',
                        populate: [
                            {
                                path: 'player1.user' ,
                                select: 'playerName'
                            } ,
                            {
                                path: 'player2.user' ,
                                select: 'playerName'
                            }
                        ]
                    }
                }
            )
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
        debugGroup( 'updatePlayerStatus()' );

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

        debugGroupEnd();
    } ,


    updateJudgeStatus: async function( request , response ) {
        debugGroup( 'updateJudgeStatus()' );

        try {
            var tournamentId = request.params.id;
            var requestJudge = request.body.judge;
            // query tournament
            var tournament = await models.Tournament.findById( tournamentId );
            // find judge to update
            var judge = tournament.judges.find(
                ( judge ) => ( judge.user.toString() === requestJudge.user )
            );
            // update judge
            judge.status = requestJudge.status;
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
    } ,


    generateBrackets: async function( request , response ) {
        debugGroup( 'generateBrackets()' );

        try {
            var tournamentId = request.params.id;
            var tournament;
            // create bracket
            tournament = await createBrackets( tournamentId );
            // assign judges to brackets
            tournament = await assignJudges( tournamentId );
            // asign and seed players to brackets
            tournament = await assignAndSeedPlayers( tournamentId );
            // advance matches with a bye
            tournament = await advanceByes( tournamentId );
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.message } );
        }

        debugGroupEnd();
    } ,


    advancePlayers: async function( request , response ) {
        debugGroup( 'advancePlayers()' );

        try {
            var tournamentId = request.params.id;
            var bracketId = request.body.bracketId;
            var matchId = request.body.matchId;
            // advance players
            var tournament = await advancePlayersMain( tournamentId , bracketId , matchId );
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.toString() } );
        }

        debugGroupEnd();
    } ,


    createResultNotification: async function( request , response ) {
        debugGroup( 'createResultNotification()' );

        try {
            var tournamentId = request.params.id;
            var bracketId = request.body.bracketId;
            var matchId = request.body.matchId;
            // create result notification
            var tournament = await createResultNotificationMain( tournamentId , bracketId , matchId );
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.toString() } );
        }

        debugGroupEnd();
    } ,


    createCommentaryNotification: async function( request , response ) {
        debugGroup( 'createCommentaryNotification()' );

        try {
            var tournamentId = request.params.id;
            var commentary = request.body.commentary;
            // create commentary notification
            var tournament = await createCommentaryNotificationMain( tournamentId , commentary );
            // return
            response.json( { tournament: tournament } );
        }
        catch( error ) {
            debugError( error );
            response.status( 422 ).json( { error: error.toString() } );
        }

        debugGroupEnd();
    }

};
