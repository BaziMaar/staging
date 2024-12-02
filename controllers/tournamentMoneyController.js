const TournamentEntry = require('../models/TournamentEntryModel');
const User=require('../models/userModel');
const addTournamentEntry = async (req, res) => {
  try {
    const { tournament_id, phone, amount, avatar, player_name } = req.body;
    const user=await User.findOne({phone});


    const newEntry = new TournamentEntry({
      tournament_id,
      phone,
      amount,
      avatar,
      player_name
    });
    user.wallet-=amount
    await user.save()

    const savedEntry = await newEntry.save();

    res.status(201).json({
      message: 'Tournament entry added successfully',
      entry: savedEntry,
      newBalance:user.wallet
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding tournament entry',
      error: error.message
    });
  }
};
const updateScoreByTransactionAndPhone = async (req, res) => {
    try {
      const { tournament_id, phone } = req.body; // Get transaction_id and phone from request body
      const { score } = req.body; // New score to update
  
      // Find and update the entry with matching transaction_id and phone
      const updatedEntry = await TournamentEntry.findOneAndUpdate(
        { tournament_id, phone }, // Query to find the document
        { score }, // Update operation
        { new: true } // Return the updated document
      );
  
      if (!updatedEntry) {
        return res.status(404).json({ message: 'Tournament entry not found' });
      }
  
      res.status(200).json({
        message: 'Score updated successfully',
        entry: updatedEntry
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating score',
        error: error.message
      });
    }
  };
  const getLeaderboard = async (req, res) => {
    try {
        // Generate random scores for 10 users between 500 and 10,000
        let users = Array.from({ length: 5 }, (_, i) => ({
            user: `User${i + 1}`,
            score: getRandomNumber(500, 10000)
        }));

        // Find the highest score among the generated random scores
        const maxScore = Math.max(...users.map(user => user.score));

        // Generate 5 additional scores greater than the maxScore
        const topScores = Array.from({ length: 5 }, () => getRandomNumber(maxScore + 1, maxScore + 1000));

        // Create 5 top users with those higher scores
        const topUsers = topScores.map((score, i) => ({
            user: `TopUser${i + 1}`,
            score
        }));

        // Combine top users and random users
        const leaderboard = [...topUsers, ...users];

        // Sort leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);

        // Respond with the leaderboard
        res.status(200).json({
            success: true,
            leaderboard
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTournamentEntry,updateScoreByTransactionAndPhone,getLeaderboard };
