const Product=require('../models/TournamentModel.js');
const moment = require('moment-timezone');
const addTournament=async(req,res)=>{
    try {
        const { tournament_name, price, short_description, start_time,end_time,category_name, description, tournament_image,entry_fee,banner_image } = req.body;
        const newProduct = new Product({
          tournament_name,
          price,
          start_time:start_time,
          end_time:end_time,
          short_description,
          category_name,
          description,
          tournament_image,
          entry_fee,
          banner_image
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Tournament added successfully', product: savedProduct });
      } catch (error) {
        res.status(500).json({ message: 'Error adding tournament', error: error.message });
      }
}
const getTodayTournaments = async (req, res) => {
  try {
      // Get the current date and time
      const currentDateTime = new Date();
      const next24Hours = new Date();
      next24Hours.setHours(currentDateTime.getHours() -24);

      // Fetch tournaments with start_time within the next 24 hours
      const todayTournaments = await Product.find({
          end_time: {
              $gte: next24Hours.toISOString(),
              $lte: currentDateTime.toISOString()
          }
      });

      // Check if any tournaments are found
      if (todayTournaments.length === 0) {
          return res.status(404).json({ message: 'No tournaments found for the next 24 hours' });
      }

      res.status(200).json(todayTournaments);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving today\'s tournaments', error: error.message });
  }
};


module.exports={addTournament,getTodayTournaments}