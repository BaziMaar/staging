const TournamentEntry = require('../models/TournamentEntryModel');

const addTournamentEntry = async (req, res) => {
  try {
    const { tournament_id, phone, amount, avatar, player_name } = req.body;

    const newEntry = new TournamentEntry({
      tournament_id,
      phone,
      amount,
      avatar,
      player_name
    });

    const savedEntry = await newEntry.save();

    res.status(201).json({
      message: 'Tournament entry added successfully',
      entry: savedEntry
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

module.exports = { addTournamentEntry,updateScoreByTransactionAndPhone };
