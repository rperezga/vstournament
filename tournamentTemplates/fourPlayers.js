/*** tournamentTemplates/fourPlayers.js
***/

module.exports = {
    playerCount: 4 ,
    bracketCount: 1 ,
    poolBracketCount: 1 ,
    brackets: [
        {
            name: 'Round of 4 Finals' ,
            matches: [
                { name: 'Match 1' } ,
                { name: 'Match 2' } ,
                { name: 'Match 3' }
            ]
        }
    ] ,
    seedRules: [
        { bracketIndex: 0 , matchIndex: 0 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 1 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 1 , player: 'player2' } ,
        { bracketIndex: 0 , matchIndex: 0 , player: 'player2' }
    ] ,
    advanceRules: [
        { bracketIndex: 0 , matchIndex: 0 , winnerToBracketIndex: 0 , winnerToMatchIndex: 2 , winnerToPlayer: 'player1' , loserResult: 3 } ,
        { bracketIndex: 0 , matchIndex: 1 , winnerToBracketIndex: 0 , winnerToMatchIndex: 2 , winnerToPlayer: 'player2' , loserResult: 3 } ,
        { bracketIndex: 0 , matchIndex: 2 , winnerResult: 1 , loserResult: 2 }
    ]
};
