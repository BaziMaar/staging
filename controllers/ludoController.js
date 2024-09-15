const games = {};
const playerGameMap = {}; // To track which game each player is in

const generateController = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Listen for player joining a game
    socket.on('joinGame', (playerData) => {
      if (!games[playerData.gameId]) {
        games[playerData.gameId] = { players: [playerData] };
      } else if (games[playerData.gameId].players.length < 2) {
        games[playerData.gameId].players.push(playerData);
      }

      // Track the game this player joined
      playerGameMap[socket.id] = playerData.gameId;

      io.emit('gameList', games);
    });

    // Listen for player leaving a game
    socket.on('leaveGame', (playerData) => {
      const game = games[playerData.gameId];

      if (game) {
        // Remove the player from the game
        game.players = game.players.filter(p => p.name !== playerData.name);
        if (game.players.length === 0) {
          delete games[playerData.gameId];
        }

        // Remove player from the game map
        delete playerGameMap[socket.id];

        io.emit('gameList', games);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);

      const gameId = playerGameMap[socket.id];
      console.log(gameId)
      if (gameId) {
        const game = games[gameId];
        console.log(game);

        if (game) {
          // Find and remove the disconnected player from the game
          game.players = game.players.filter(p => p.socketId !== socket.id);
          console.log(game.players.length)

          // If the game is empty after removal, delete the game
          if (game.players.length === 0) {
            delete games[gameId];
          }

          // Remove the player from the player-game map
          console.log(playerGameMap[socket.id])
          delete playerGameMap[socket.id];
          delete games[gameId];
          console.log(playerGameMap[socket.id])
          io.emit('gameList', games);
        }
      }
    });

    // Emit the current game list to the client
    socket.emit('gameList', games);
  });
};

module.exports = { generateController };
