const games={};
const generateController=(io)=>{
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
    
        // Listen for player joining a game
        socket.on('joinGame', (playerData) => {
            if (!games[playerData.gameId]) {
                games[playerData.gameId] = { players: [playerData] };
            } else if (games[playerData.gameId].players.length < 2) {
                games[playerData.gameId].players.push(playerData);
            }
            io.emit('gameList', games);
        });
        socket.on('leaveGame', (playerData) => {
            const game = games[playerData.gameId];
    
            if (game) {
                // Remove the player from the game
                game.players = game.players.filter(p => p.name !== playerData.name);
                if (game.players.length === 0) {
                    delete games[playerData.gameId];
                }
                io.emit('gameList', games);
            }
        });
        socket.emit('gameList', games);
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};

module.exports={generateController};