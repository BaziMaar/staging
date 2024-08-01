const AutoModel=require('../models/AutoModel')
const updateAuto=async(req,res)=>{
    const updateApp=new AutoModel({auto_dt:req.body.auto_dt,auto_color:req.body.auto_color,auto_spin:req.body.auto_spin})
    updateApp.save();
    res.status(200).send({success:true})
  }
  const getAuto = async (req, res) => {
    try {
      const latestEntry = await AutoModel.findOne().sort({ createdAt: -1 }).exec();
      res.status(200).send({ latestEntry });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };
  module.exports={
    updateAuto,
    getAuto
  }