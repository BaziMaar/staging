const Product=require('../models/TournamentModel.js');
const moment = require('moment-timezone');
const addTournament=async(req,res)=>{
    try {
        const { tournament_name, price, short_description, start_time,end_time,category_name, description, tournament_image,entry_fee,banner_image } = req.body;
        const start_time_UTC = moment.tz(req.body.start_time, "Asia/Kolkata").utc().toDate();
        const end_time_UTC = moment.tz(req.body.end_time, "Asia/Kolkata").utc().toDate();   
        const newProduct = new Product({
          tournament_name,
          price,
          start_time:start_time_UTC,
          end_time:end_time_UTC,
          short_description,
          category_name,
          description,
          tournament_image,
          entry_fee,
          banner_image
        });
    
        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Tournament added successfully', product: savedProduct });
      } catch (error) {
        res.status(500).json({ message: 'Error adding tournament', error: error.message });
      }
}
const getTodayTournaments = async (req, res) => {
    try {
      const startOfDayIST = moment().tz("Asia/Kolkata").startOf('day');
      const endOfDayIST = moment().tz("Asia/Kolkata").endOf('day');
      const startOfDayUTC = startOfDayIST.utc().toDate();
      const endOfDayUTC = endOfDayIST.utc().toDate();
  
      // Query tournaments happening today
      const todayTournaments = await Product.find({
        $or: [
          { start_time: { $gte: startOfDayUTC, $lte: endOfDayUTC } },
          { end_time: { $gte: startOfDayUTC, $lte: endOfDayUTC } },
        ],
      });
  
      if (todayTournaments.length === 0) {
        return res.status(404).json({ message: 'No tournaments found for today' });
      }
  
      res.status(200).json(todayTournaments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving today\'s tournaments', error: error.message });
    }
  };
module.exports={addTournament,getTodayTournaments}