const LuckyTransaction = require("../models/ColorTransictionsModel.js");
const User = require("../models/userModel.js");  // Import the User model
const Ref=require('../models/referModel')
let firstBet = 0;
let secondBet = 0;
let thirdBet = 0;
let smallSizeBet=0;
let bigSizeBet=0;
let zeroNumberBet=0;
let oneNumberBet=0;
let twoNumberBet=0;
let threeNumberBet=0;
let fourNumberBet=0;
let fiveNumberBet=0;
let sixNumberBet=0;
let sevenNumberBet=0;
let eightNumberBet=0;
let nineNumberBet=0;
let winner = null;
let count =0;
const probabilitied = [0.1, 0.1, 0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]; 

function generateRandomWithProbability(probabilities) {
  const rand = Math.random();
  let cumulativeProbability = 0;
  
  for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      
      if (rand < cumulativeProbability) {
          return i;
      }
  }
}
const generateAndBroadcastNumber = (io) => {
  let lastNumbers=[0,0,0,0,0,0,0,0,0,0,0,0]
  let targetNumber = 0;
  let currentNumber = 0;
  let timeRemaining = 45;
  let intervalId = null;
  const generateAndBroadcast = () => {
    targetNumber = 5;
    currentNumber = 0;
    timeRemaining = 45;
    let a=0,b=0,c=0;
    winner = '';
    let spin=false
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]}); 
      }else if (currentNumber < targetNumber&&currentNumber!==0) {
        currentNumber += 1;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]});       }
      else if(currentNumber===0&&timeRemaining===0){
        currentNumber++;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]});         spin=true
        if((firstBet===0&&secondBet===0&&thirdBet===0&&smallSizeBet===0&&bigSizeBet===0&&zeroNumberBet===0&&oneNumberBet===0&&twoNumberBet===0&&threeNumberBet===0&&fourNumberBet===0&&fiveNumberBet===0&&sixNumberBet===0&&sevenNumberBet===0&&eightNumberBet===0&&nineNumberBet===0)||count===1){
          winner=generateRandomWithProbability(probabilitied);
          count=0
        }
        else if ((zeroNumberBet <=oneNumberBet  && zeroNumberBet <= twoNumberBet&&zeroNumberBet <= threeNumberBet&&zeroNumberBet <= fourNumberBet&&zeroNumberBet <= fiveNumberBet&&zeroNumberBet <= sixNumberBet&&zeroNumberBet <= sevenNumberBet&&zeroNumberBet <= eightNumberBet&&zeroNumberBet <= nineNumberBet)&&(smallSizeBet<=bigSizeBet)&&(firstBet<=thirdBet)&&(secondBet<=thirdBet)) {
          winner = 0; // First bet is the highest
          count=0
      } else if ((oneNumberBet <=zeroNumberBet  && oneNumberBet <= twoNumberBet&&oneNumberBet <= threeNumberBet&&oneNumberBet <= fourNumberBet&&oneNumberBet <= fiveNumberBet&&oneNumberBet <= sixNumberBet&&oneNumberBet <= sevenNumberBet&&oneNumberBet <= eightNumberBet&&oneNumberBet <= nineNumberBet)&&(smallSizeBet<=bigSizeBet)&&(secondBet<=thirdBet)&&(secondBet<=firstBet)) {
        winner = 1; // Second bet is the highest
        count=0
      } else if ((twoNumberBet <=zeroNumberBet  && twoNumberBet <= oneNumberBet&&twoNumberBet <= threeNumberBet&&twoNumberBet <= fourNumberBet&&twoNumberBet <= fiveNumberBet&&twoNumberBet <= sixNumberBet&&twoNumberBet <= sevenNumberBet&&twoNumberBet <= eightNumberBet&&twoNumberBet <= nineNumberBet)&&(smallSizeBet<=bigSizeBet)&&(thirdBet<=firstBet)&&(thirdBet<=secondBet)) {
        winner = 2; // Second bet is the highest
        count=0
      }else if ((threeNumberBet <=zeroNumberBet  && threeNumberBet <= oneNumberBet&&threeNumberBet <= twoNumberBet&&threeNumberBet <= fourNumberBet&&threeNumberBet <= fiveNumberBet&&threeNumberBet <= sixNumberBet&&threeNumberBet <= sevenNumberBet&&threeNumberBet <= eightNumberBet&&threeNumberBet <= nineNumberBet)&&(smallSizeBet<=bigSizeBet)&&(secondBet<=thirdBet)&&(secondBet<=firstBet)) {
        winner = 3; // Second bet is the highest
        count=0
      } 
      else if ((fourNumberBet <=zeroNumberBet  && fourNumberBet <= oneNumberBet&&fourNumberBet <= threeNumberBet&&fourNumberBet <= twoNumberBet&&fourNumberBet <= fiveNumberBet&&fourNumberBet <= sixNumberBet&&fourNumberBet <= sevenNumberBet&&fourNumberBet <= eightNumberBet&&fourNumberBet <= nineNumberBet)&&(smallSizeBet<=bigSizeBet)&&(thirdBet<=firstBet)&&(thirdBet<=secondBet)) {
        winner = 4; // Second bet is the highest
        count=0
      } 
      else if ((fiveNumberBet <=zeroNumberBet  && fiveNumberBet <= oneNumberBet&&fiveNumberBet <= threeNumberBet&&fiveNumberBet <= fourNumberBet&&fiveNumberBet <= twoNumberBet&&fiveNumberBet <= sixNumberBet&&fiveNumberBet <= sevenNumberBet&&fiveNumberBet <= eightNumberBet&&fiveNumberBet <= nineNumberBet)&&(smallSizeBet>=bigSizeBet)&&(thirdBet<=firstBet)&&(secondBet<=firstBet)) {
        winner = 5; // Second bet is the highest
        count=0
      } 
      else if ((sixNumberBet <=zeroNumberBet  && sixNumberBet <= oneNumberBet&&sixNumberBet <= threeNumberBet&&sixNumberBet <= fourNumberBet&&sixNumberBet <= fiveNumberBet&&sixNumberBet <= twoNumberBet&&sixNumberBet <= sevenNumberBet&&sixNumberBet <= eightNumberBet&&sixNumberBet <= nineNumberBet)&&(smallSizeBet>=bigSizeBet)&&(thirdBet<=firstBet)&&(thirdBet<=secondBet)) {
        winner = 6; // Second bet is the highest
        count=0
      } 
      else if ((sevenNumberBet <=zeroNumberBet  && sevenNumberBet <= oneNumberBet&&sevenNumberBet <= threeNumberBet&&sevenNumberBet <= fourNumberBet&&sevenNumberBet <= fiveNumberBet&&sevenNumberBet <= sixNumberBet&&sevenNumberBet <= twoNumberBet&&sevenNumberBet <= eightNumberBet&&sevenNumberBet <= nineNumberBet)&&(smallSizeBet>=bigSizeBet)&&(secondBet<=thirdBet)&&(secondBet<=firstBet)) {
        winner = 7; // Second bet is the highest
        count=0
      } 
      else if ((eightNumberBet <=zeroNumberBet  && eightNumberBet <= oneNumberBet&&eightNumberBet <= threeNumberBet&&eightNumberBet <= fourNumberBet&&eightNumberBet <= fiveNumberBet&&eightNumberBet <= sixNumberBet&&eightNumberBet <= sevenNumberBet&&eightNumberBet <= twoNumberBet&&eightNumberBet <= nineNumberBet)&&(smallSizeBet>=bigSizeBet)&&(thirdBet<=firstBet)&&(thirdBet<=secondBet)) {
        winner = 8; // Second bet is the highest
        count=0
      } 
      else if ((nineNumberBet <=zeroNumberBet  && nineNumberBet <= oneNumberBet&&nineNumberBet <= threeNumberBet&&nineNumberBet <= fourNumberBet&&nineNumberBet <= fiveNumberBet&&nineNumberBet <= sixNumberBet&&nineNumberBet <= sevenNumberBet&&nineNumberBet <= eightNumberBet&&nineNumberBet <= twoNumberBet)&&(smallSizeBet>=bigSizeBet)&&(secondBet<=thirdBet)&&(secondBet<=firstBet)) {
        winner = 9; // Second bet is the highest
        count=0
      } 
       else {       
          winner = 0; //condition may be false
          count=0
      }
        lastNumbers.push(winner)
        if(lastNumbers.length>12){
          lastNumbers.shift();
        }
      }  
      else {
        firstBet = 0;
        secondBet = 0;
        thirdBet = 0;
        zeroNumberBet=0;
        oneNumberBet=0;
        twoNumberBet=0;
        threeNumberBet=0;
        fourNumberBet=0;
        fiveNumberBet=0
        sixNumberBet=0;
        sevenNumberBet=0;
        eightNumberBet=0;
        nineNumberBet=0;
        smallSizeBet=0;
        bigSizeBet=0;
        clearInterval(intervalId);
        generateAndBroadcast();
        
       
      }
    }, 1000); // Reduced the interval to 1000ms (1 second)
  };
  // Call generateAndBroadcast to start the initial round
  generateAndBroadcast();
};

const sendColorMoney = async (io, phone, color,number,size, amount) => {
  try {
    count++;
    let userTransaction = await LuckyTransaction.findOne({ phone });
    const sender = await User.findOne({ phone });
    if (!sender) {
      throw new Error('Sender not found');
    }

    if (!userTransaction) {
      userTransaction = new LuckyTransaction({
        phone,
        transactions: [],
      });
    }

    if (color === 0) {
      am1+=amount
      firstBet += 2 * amount; // Adjusted for the voilet
    } else if (color === 1) {
      am2+=amount
      secondBet += 2 * amount; // Adjusted for the green
    } else if(color===2) {
      am3+=amount
      thirdBet += 2 * amount; // Adjusted the red
    }
    else if(size===0){
      smallSizeBet+=2*amount;
    }
    else if(size===1){
      bigSizeBet+=2*amount;
    }
    else if(number===0){
      zeroNumberBet+=9*amount;
    }
    else if(number===1){
      oneNumberBet+=9*amount;
    }
    else if(number===2){
      twoNumberBet+=9*amount;
    }
    else if(number===3){
      threeNumberBet+=9*amount;
    }
    else if(number===4){
      fourNumberBet+=9*amount;
    }
    else if(number===5){
      fiveNumberBet+=9*amount;
    }
    else if(number===6){
      sixNumberBet+=9*amount;
    }
    else if(number===7){
      sevenNumberBet+=9*amount;
    }
    else if(number===8){
      eightNumberBet+=9*amount;
    }
    else if(number===9){
      nineNumberBet+=9*amount;
    }
    console.log(`>>>>>userTrans>>`,userTransaction)
    console.log(`>>>>>userTrans>>`,{color,number,size,amount})
    

    userTransaction.transactions.push({ color,number,size, amount: -amount });
    await userTransaction.save();
    if (sender.wallet < amount) {
      io.emit('walletColorUpdated', {phone:phone, error: 'Insufficient Funds' });
      return { success: false, message: 'InSufficient Funds' };
    } else {
      sender.wallet -= amount;
      await sender.save();
      io.emit('walletColorUpdated', { phone, newBalance: sender.wallet, color,size,number });
    
      return { success: true, message: 'Money sent successfully',newBalance:sender.wallet,color,size,number };
    }
  } catch (error) {
    io.emit('walletColorUpdated', { error: 'Failed to send money. Please try again.' });
    throw new Error('Failed to send money. Please try again.');
  }
};
  
  const receiveMoney = async (io, phone, color,size,number, amount) => {
    let winning=0;
    try {
      const [sender, userTransaction] = await Promise.all([
        User.findOne({ phone }),
        LuckyTransaction.findOne({ phone })
      ]);
      if (!sender) {
        throw new Error('Sender not found');
      }
      // Initialize userTransaction if not found
      let newUserTransaction = userTransaction;
      if (!newUserTransaction) {
        newUserTransaction = new LuckyTransaction({
          phone,
          transactions: []
        });
      }
      if(winner%2===0){
        if(color===0&&winner===0){
          winning=amount*2;
        }
        else {
          if(color===2&&winning===0){
            winning=amount*1.5
          }
          else{
             winning=amount*2
          }
        }
      }
      else{
        if(color===0&&winner===5){
          winning=amount*2;
        }
        else {
          if(color===1&&winning===5){
            winning=amount*1.5
          }
          else{
             winning=amount*2
          }
        }
      }
      if(size===0&&winner<5){
        winning=amount*2
      }
      else if(size===1&&winner>5){
        winning=amount*2
      }
      else{
        winning=amount*0
      }
      if(number===winner){
        winning=amount*9
      }
      else{
        winning=amount*0
      }

  
      const referredUsers = await User.findOne({ refer_id: { $in: sender.user_id } });
      if (referredUsers) {
        const referralBonus = 0.05 * winning;
  
        // Add the referral bonus to the referring user's account
        referredUsers.referred_wallet += referralBonus;
        console.log(`>>>>>>>>>>>5`)
        let ref = await Ref.findOne({ phone: referredUsers.phone });
        if (ref) {
          ref.referred.push({
            user_id: sender.user_id,
            avatar: sender.avatar,
            amount: referralBonus
          });
        } else {
          console.log(`>>>>>>>>>>>>>>6`)
          ref = new Ref({
            phone: referredUsers.phone,
            referred: [{
              user_id: sender.user_id,
              avatar: sender.avatar,
              amount: referralBonus
            }]
          });
        }
  
        // Save the updated referring user and the Ref model
        await Promise.all([referredUsers.save(), ref.save()]);
      }
      sender.wallet +=winning;
      sender.withdrwarl_amount += winning;
      await sender.save();
      newUserTransaction.transactions.push({color: color, amount:winning,size,number});
      // Use a batch save for better performance
      await Promise.all([newUserTransaction.save(), sender.save()]);
  
      io.emit('walletColorUpdated', { phone, newBalance: sender.wallet,color,size,number });
  
      return { success: true, message: 'Money received successfully',newBalance:sender.wallet };
    } catch (error) {
      throw new Error('Server responded falsely');
    }
  };
  
  const getColorTransactions = async (req, res) => {
    const { phone } = req.query;
    try {
      const userTransactions = await LuckyTransaction.findOne({ phone });
      if (!userTransactions) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ transactions: userTransactions.transactions });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = {
    generateAndBroadcastNumber,
    sendColorMoney,
    receiveMoney,
    getColorTransactions
  };
  