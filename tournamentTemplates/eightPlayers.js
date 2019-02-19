/*** tournamentTemplates/eightPlayers.js
***/

module.exports = {
    playerCount: 8 ,
    bracketCount: 1 ,
    poolBracketCount: 1 ,
    brackets: [
        {
            name: 'Round of 8 Finals' ,
            matches: [
                { name: 'Match 1' } ,
                { name: 'Match 2' } ,
                { name: 'Match 3' } ,
                { name: 'Match 4' } ,
                { name: 'Match 5' } ,
                { name: 'Match 6' } ,
                { name: 'Match 7' }
            ]
        }
    ] ,
    seedRules: [
        { bracketIndex: 0 , matchIndex: 0 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 2 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 3 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 1 , player: 'player1' } ,
        { bracketIndex: 0 , matchIndex: 1 , player: 'player2' } ,
        { bracketIndex: 0 , matchIndex: 3 , player: 'player2' } ,
        { bracketIndex: 0 , matchIndex: 2 , player: 'player2' } ,
        { bracketIndex: 0 , matchIndex: 0 , player: 'player2' }
    ] ,
    advanceRules: [
        { bracketIndex: 0 , matchIndex: 0 , winnerToBracketIndex: 0 , winnerToMatchIndex: 4 , winnerToPlayer: 'player1' , loserResult: 5 } ,
        { bracketIndex: 0 , matchIndex: 1 , winnerToBracketIndex: 0 , winnerToMatchIndex: 4 , winnerToPlayer: 'player2' , loserResult: 5 } ,
        { bracketIndex: 0 , matchIndex: 2 , winnerToBracketIndex: 0 , winnerToMatchIndex: 5 , winnerToPlayer: 'player1' , loserResult: 5 } ,
        { bracketIndex: 0 , matchIndex: 3 , winnerToBracketIndex: 0 , winnerToMatchIndex: 5 , winnerToPlayer: 'player2' , loserResult: 5 } ,
        { bracketIndex: 0 , matchIndex: 4 , winnerToBracketIndex: 0 , winnerToMatchIndex: 6 , winnerToPlayer: 'player1' , loserResult: 3 } ,
        { bracketIndex: 0 , matchIndex: 5 , winnerToBracketIndex: 0 , winnerToMatchIndex: 6 , winnerToPlayer: 'player2' , loserResult: 3 } ,
        { bracketIndex: 0 , matchIndex: 6 , winnerResult: 1 , loserResult: 2 }
    ]
};
