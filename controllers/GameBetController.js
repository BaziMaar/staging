const GameBetEntry=require('../models/GameBetModel.js')
const User = require('../models/userModel');
const receiveMoney = async (req, res) => {
    try {
      const { phone, avatar, score, amount, game_name } = req.body;
      const sender = await User.findOne({ phone });
      if (!sender) {
        return res.status(404).json({ error: "Sender not found" });
      }
      sender.wallet += amount;
      
      const newBet = new GameBetEntry({ phone, avatar, score, amount, game_name });

      const savedBet = await newBet.save();
      res.status(201).json(savedBet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}
const sendMoney = async (req, res) => {
    try {
      const { phone, avatar, amount, game_name } = req.body;
  
      // Find the sender
      const sender = await User.findOne({ phone });
      if (!sender) {
        return res.status(404).json({ error: "Sender not found" });
      }
  
      // Check for sufficient funds
      if (sender.wallet < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
  
      // Deduct amount from sender's wallet
      sender.wallet -= amount;
      await sender.save();
  
      // Create a new GameBetEntry
      const newBet = new GameBetEntry({
        phone,
        avatar,
        amount: -amount, // Store negative amount to represent deduction
        game_name,
      });
      const savedBet = await newBet.save();
  
      // Send response
      res.status(201).json(savedBet);
  
      // Emit wallet update event
      const time = new Date().toISOString(); // Capture current timestamp
      io.emit("walletUpdated", { phone, newBalance: sender.wallet, time });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
module.exports={
  receiveMoney,
  sendMoney

}