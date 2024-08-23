// walletService.js
const User = require('../models/userModel');
const Ref=require(`../models/referModel`);

const Wallet=require('../models/walletModel');
const addFunds = async (phone, amount,utr) => {
  try {
    // Find user
    let user = await User.findOne({ phone: phone });

    // If user not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }
    if(utr===""){
      user.wallet += amount;
    }
    // Update user's wallet
    

    // Find referred users
    const referredUsers = await User.findOne({ refer_id: { $in: user.user_id } });

    if (referredUsers){
      const referralBonus = 0.02 * amount;
      referredUsers.referred_wallet += referralBonus;
      await referredUsers.save();
      let ref = await Ref.findOne({ phone: referredUsers.phone });
      if (ref) {
        ref.referred.push({
          user_id: user.user_id,
          avatar: user.avatar||1,
          amount: referralBonus,
          deposit_amount:amount,
          withdraw_amount:0
        })
      } 
      else {
        ref = new Ref({
          phone:referredUsers.phone,
          referred: {
            user_id: user.user_id,
            avatar: user.avatar||1,
            amount: referralBonus,
            deposit_amount:amount,
            withdraw_amount:0
          }
        });
      }

    await ref.save();
    }
    // Save the updated user
    await user.save();

    // Find wallet
    let wallet = await Wallet.findOne({ phone: phone });

    // If wallet not found, create a new one
    if (!wallet) {
      wallet = new Wallet({
        phone,
        walletTrans: []
      });
    }

    // Add the new transaction to wallet
    if(utr!==""){
      wallet.walletTrans.push({ time: new Date(), amount: amount, status: 0,utr:utr });
    }
    wallet.walletTrans.push({ time: new Date(), amount: amount, status: 1 });
    await wallet.save();

    // Return updated wallet balance
    return user.wallet;
  } catch (error) {
    console.error('Error adding funds:', error);
    throw error;
  }
};

  

const deductFunds = async (phone, amount,paymentId,bankId=0,ifscCode=0) => {
  try {
    const user = await User.findOne({ phone: phone });
    let wallet = await Wallet.findOne({ phone: phone });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.withdrwarl_amount <= amount || user.wallet <= amount) {
      throw new Error('Insufficient funds');
    }
    user.wallet -= amount;
    user.withdrwarl_amount-=amount
    await user.save();
    if (!wallet) {
      wallet = new Wallet({
        phone,
        walletTrans: []
      });
    }
    wallet.walletTrans.push({ time: new Date(), amount: -amount, status: 0,paymentId,bankId,ifscCode });
    await wallet.save();
    return user.wallet;
  } catch (error) {
    console.error('Error deducting funds:', error);
    throw error;
  }
};
module.exports = {
  addFunds,
  deductFunds,
};
