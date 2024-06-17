const User = require("../models/userModel");
const Ref=require("../models/referModel.js");
const Merchant=require("../models/merchantModel.js");
const App = require("../models/AppModel");
const userLogin = async (req, res) => {
    try {
      const phone = req.body.phone;
      const userData = await User.findOne({ phone: phone });
      const deviceId=req.body.deviceId
  
      if (userData) {
        if (deviceId) {
          // Remove previous device ID if exists and add the new one
          userData.deviceId = deviceId;
          await userData.save();
        }
        // User exists, send user details
        const userResult = {
          _id: userData._id,
          name: userData.name,
          phone: userData.phone,
          email:userData.email,
          wallet:userData.wallet,
          avatar:userData.avatar,
          user_id:userData.user_id,
          refer_id:userData.refer_id,
          deviceIds: userData.deviceId,
          withdrwarl_amount:userData.withdrwarl_amount
        };
  
        const response = {
          success: true,
          msg: "UserDetail",
          data: userResult,
        };
        res.status(200).send(response);
      } 
      else {
        // User does not exist, signup the user
        if(!req.body.email&&!req.body.name){
          return res.status(400).send({ success: false, msg: "user not found" });
        }
        else{
          var min = 100000; // Minimum 6-digit number
          var max = 999999; // Maximum 6-digit numbers

        let userID=await generateUniqueUserID()
        const referId = req.body.referId || req.body.refer_id
        let referAmount=41;
        if(referId){
        const referedUser = await User.findOne({ user_id: referId });
        
        if (referedUser) {
          // Check if referId is not already in the array
          if (!referedUser.refer_id.includes(userID)) {
            referedUser.refer_id.push(userID);
            referAmount+=10;
        
            // Save the updated user
            await referedUser.save();
          }
        }
      }
          const newUser = new User({
            phone: phone,
            email:req.body.email,
            name:req.body.name,
            refer_id:[],
            avatar:req.body.avatar,
            user_id:userID,
            withdrwarl_amount:0,
            deviceId: deviceId,
            wallet:referAmount

            // Add any other required fields for signup
          });
    
          const savedUser = await newUser.save();
          const userResult = {
            _id: savedUser._id,
            name: savedUser.name,
            phone: savedUser.phone,
            email:savedUser.email,
            avatar:savedUser.avatar,
            user_id:savedUser.user_id,
            withdrwarl_amount:savedUser.withdrwarl_amount,
            refer_id:savedUser.refer_id,
            deviceIds: savedUser.deviceId,
            wallet:savedUser.wallet
          };
    
          const response = {
            success: true,
            msg: "User created successfully",
            data: userResult,
          };
          res.status(200).send(response);
        }
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  const getUser=async(req,res)=>{
    try {
      const users = await User.find();
  
      // If no wallets found, return a 404 response
      if (!users || users.length === 0) {
        return res.status(404).send({ error: 'user not found' });
      }
      const response = {
        success: true,
        data: users
      };
  
      // Send wallet data as a response
      res.status(200).send(response);
    }
    catch (error) {
      console.error('Error getting user :', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
  async function generateUniqueUserID() {
    while (true) {
      var userID = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  
      // Check if the generated user ID already exists
      const existingUser = await User.findOne({ user_id: userID });
  
      if (!existingUser) {
        // If the user ID is unique, return it
        return userID;
      }
      // If the user ID already exists, generate a new one in the next iteration
    }
  }
  
  const updateProfile=async (req,res)=>{
    const phone = req.body.phone;
    const existingUser = await User.findOne({ phone: phone });

    if (existingUser) {
      // User exists, update user details
      existingUser.name = req.body.name || existingUser.name;
      existingUser.email = req.body.email || existingUser.email;
      existingUser.avatar = req.body.avatar || existingUser.avatar;

      const updatedUser = await existingUser.save();

      const userResult = {
        _id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
        wallet: updatedUser.wallet,
        avatar: updatedUser.avatar,
      };

      const response = {
        success: true,
        msg: "User details updated successfully",
        data: userResult,
      };

      res.status(200).send(response);
    }
  }
  const updateApp=async(req,res)=>{
    const version=req.body.version;
    const link=req.body.link;
    const updateApp=new App({version:version,link:link})
    updateApp.save();
    res.status(200).send({success:true})

  }
  const getVersion = async (req, res) => {
    try {
      const latestEntry = await App.findOne().sort({ createdAt: -1 }).exec();
      res.status(200).send({ latestEntry });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };
  const postUpi=async (req, res) => {
    const { upi } = req.body;

    if (!upi) {
        return res.status(400).send('UPI ID is required');
    }

    try {
        let merchant = await Merchant.findOne();

        if (!merchant) {
            merchant = new Merchant({ upi: [] });
        }

        merchant.upi.push(upi);
        await merchant.save();

        res.status(200).send(merchant);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteUpi = async (req, res) => {
  const { upi } = req.body;

  if (!upi) {
      return res.status(400).send('UPI ID is required');
  }

  try {
      let merchant = await Merchant.findOne();

      if (!merchant) {
          return res.status(404).send('Merchant not found');
      }

      const upiIndex = merchant.upi.indexOf(upi);
      if (upiIndex === -1) {
          return res.status(404).send('UPI ID not found');
      }

      merchant.upi.splice(upiIndex, 1);
      await merchant.save();

      res.status(200).send(merchant);
  } catch (error) {
      res.status(500).send(error.message);
  }
}

const getUpi=async (req, res) => {
  try {
      const merchant = await Merchant.findOne();

      if (!merchant) {
          return res.status(404).send('Merchant not found');
      }

      res.status(200).send(merchant.upi);
  } catch (error) {
      res.status(500).send(error.message);
  }
}

  
  module.exports={
    userLogin,
    updateProfile,
    getUser,
    updateApp,
    getVersion,
    postUpi,
    getUpi,
    deleteUpi

  };
