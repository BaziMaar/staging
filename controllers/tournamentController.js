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
      const todayTournaments = await Product.find();
  
      if (todayTournaments.length === 0) {
        return res.status(404).json({ message: 'No tournaments found for today' });
      }
  
      res.status(200).json(todayTournaments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving today\'s tournaments', error: error.message });
    }
  };
module.exports={addTournament,getTodayTournaments}