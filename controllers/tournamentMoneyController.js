const TournamentEntry = require('../models/TournamentEntryModel');
const User=require('../models/userModel');
let cachedRandomScores = null;
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
  const generateRandomScores = (maxScore) => {
    const randomScores = [];
    for (let i = 0; i < 5; i++) {
        maxScore = Math.floor(Math.random() * 1000) + 50; // Decrease score by random value
        if (maxScore < 1000) break; // Ensure scores don't go below 1000
        randomScores.push(maxScore);
    }
    const ans=randomScores.sort()
    return ans;
};

const isEmpty = (value) => value === null || value === undefined || value === '';

const getLeaderboard = async (req, res) => {
    try {
        const { tournament_id, phone } = req.query;
        if (isEmpty(tournament_id) || isEmpty(phone)) {
            return res.status(400).json({ error: 'tournament_id and phone are required' });
        }
        const entries = await TournamentEntry.find({ tournament_id }).sort({ score: -1 });
        // if (!entries || entries.length === 0) {
        //     return res.status(404).json({ error: 'No entries found for this tournament' });
        // }
        const topPlayerScore = isEmpty(entries[0]?.score) ? 1000 : entries[0].score;
        if (!cachedRandomScores) {
            cachedRandomScores = generateRandomScores(topPlayerScore);
        }
        const userEntryIndex = entries.findIndex(entry => entry.phone === phone);
        const userEntry = isEmpty(userEntryIndex)?null:entries[userEntryIndex];
        if (isEmpty(userEntry)) {
            return res.json({
                message: 'Player not found in the tournament. Displaying random top 5 scores.',
                top5Scores: cachedRandomScores,
            });
        }
        const userRank = userEntryIndex + 1;
        res.json({
            phone,
            tournament_id,
            userRank: userRank + 5,
            userScore: userEntry?.score || 0,
            topPlayerScore,
            top5Scores: cachedRandomScores,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { addTournamentEntry,updateScoreByTransactionAndPhone,getLeaderboard };
