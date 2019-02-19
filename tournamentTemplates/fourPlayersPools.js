/*** tournamentTemplates/fourPlayersPools.js
***/

module.exports = {
    playerCount: 4 ,
    bracketCount: 3 ,
    poolBracketCount: 2 ,
    brackets: [
        {
            name: 'Round of 4 Pool 1' ,
            matches: [ { name: 'Match 1' } ]
        } ,
        {
            name: 'Round of 4 Pool 2' ,
            matches: [ { name: 'Match 1' } ]
        } ,
        {
            name: 'Round of 2 Finals' ,
            matches: [ { name: 'Match 1' } ]
        }
    ] ,
    seedRules: [
        { bracketIndex: 0 , matchIndex: 0 , player: 'player1' } ,
        { bracketIndex: 1 , matchIndex: 0 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 0 , player: 'player2' } ,
        { bracketIndex: 1 , matchIndex: 0 , player: 'player2' }
    ] ,
    advanceRules: [
        { bracketIndex: 0 , matchIndex: 0 , winnerToBracketIndex: 1 , winnerToMatchIndex: 0 , winnerToPlayer: 'player1' , loserResult: 3 } ,
        { bracketIndex: 0 , matchIndex: 0 , winnerToBracketIndex: 1 , winnerToMatchIndex: 0 , winnerToPlayer: 'player2' , loserResult: 3 } ,
        { bracketIndex: 1 , matchIndex: 0 , winnerResult: 1 , loserResult: 2 }
    ]
};
