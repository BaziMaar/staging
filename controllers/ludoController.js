const games = {};
const playerGameMap = {}; // To track which game each player is in
let gameIdCounter = 100000; // Initialize a gameId counter.

const generateController = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinGame', (playerData) => {
      const { amount } = playerData; 
      let gameId;
      for (const id in games) {
        if (games[id].players.length < 2 && games[id].amount === amount) {
          gameId = id;
          break;
        }
      }
      if (!gameId) {
        gameIdCounter++; 
        gameId = gameIdCounter;
        games[gameId] = { 
          players: [{ ...playerData, socketId: socket.id }],
          amount,
        };
      } else {
        // Add player to the found game
        games[gameId].players.push({ ...playerData, socketId: socket.id });
      }

      // Track the game this player joined
      playerGameMap[socket.id] = gameId;

      // Emit the updated game list to all clients
      io.emit('gameList', games);
    });

    // Listen for player leaving a game
    socket.on('leaveGame', (playerData) => {
      const game = games[playerData.gameId];

      if (game) {
        // Remove the player from the game
        game.players = game.players.filter(p => p.name !== playerData.name);
        if (game.players.length === 0) {
          delete games[playerData.gameId]; // Delete the game if no players remain
        }

        // Remove player from the player-game map
        delete playerGameMap[socket.id];

        // Emit the updated game list to all clients
        io.emit('gameList', games);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);

      const gameId = playerGameMap[socket.id];
      if (gameId) {
        const game = games[gameId];
        if (game) {
          // Remove the disconnected player from the game
          game.players = game.players.filter(p => p.socketId !== socket.id);

          // If the game is empty after removal, delete the game
          if (game.players.length === 0) {
            delete games[gameId];
          }

          // Remove the player from the player-game map
          delete playerGameMap[socket.id];

          // Emit the updated game list to all clients
          io.emit('gameList', games);
        }
      }
    });

    // Emit the current game list to the client
    socket.emit('gameList', games);
  });
};

module.exports = { generateController };
