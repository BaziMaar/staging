const games = {};
const playerGameMap = {}; // To track which game each player is in
let gameIdCounter = 100000; // Initialize a gameId counter

const generateController = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinGame', (playerData) => {
      let gameId = playerData.gameId;

      // If the player didn't send a gameId, create a new game
      if (!gameId) {
        gameIdCounter++; // Generate a new unique gameId
        gameId = gameIdCounter;
        games[gameId] = { players: [{ ...playerData, socketId: socket.id }] };
      } else if (games[gameId] && games[gameId].players.length < 2) {
        // If the game exists and has less than 2 players, add the player
        games[gameId].players.push({ ...playerData, socketId: socket.id });
      } else {
        // Send an error if the game doesn't exist or is full
        socket.emit('error', { message: 'Game full or does not exist' });
        return;
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
