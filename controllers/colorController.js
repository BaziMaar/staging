const LuckyTransaction = require("../models/ColorTransictionsModel.js");
const User = require("../models/userModel.js");  // Import the User model
const Ref=require('../models/referModel')
const Result=require('../models/resultModel.js')
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
let globalNumber=666777;
const setGlobalNumber = async () => {
  try {
    const lastEntry = await Result.findOne().sort({ createdAt: -1 });
    if (lastEntry) {
      globalNumber = lastEntry.globalNumber;
    }
  } catch (error) {
    console.error(error);
  }
};

const initializeGlobalNumber = async () => {
  await setGlobalNumber();
};

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}${month}${day}`;
}
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
const generateAndBroadcastNumber = async(io) => {
  let lastNumbers=[0,0,0,0,0,0,0,0,0,0,0,0]
  let targetNumber = 0;
  let currentNumber = 0;
  let timeRemaining = 60;
  let intervalId = null;
  await initializeGlobalNumber()
  
  const generateAndBroadcast = () => {
    targetNumber = 0;
    currentNumber = 0;
    timeRemaining = 60;
    const currentDate=getCurrentDate()
    let finalNumber=number=String(currentDate)+String(globalNumber)
    let a=0,b=0,c=0;
    winner = '';
    let spin=false
    clearInterval(intervalId);
    intervalId = setInterval(async() => {
      if (timeRemaining > 5) {
        timeRemaining--;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet,zero:zeroNumberBet,one:oneNumberBet,two:twoNumberBet,three:threeNumberBet,four:fourNumberBet,five:fiveNumberBet,six:sixNumberBet,seven:sevenNumberBet,eight:eightNumberBet,nine:nineNumberBet,small:smallSizeBet,big:bigSizeBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,globalNumbers:finalNumber,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]}); 
      }
      else if (timeRemaining>=0&&timeRemaining<5) {
        timeRemaining--;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet,zero:zeroNumberBet,one:oneNumberBet,two:twoNumberBet,three:threeNumberBet,four:fourNumberBet,five:fiveNumberBet,six:sixNumberBet,seven:sevenNumberBet,eight:eightNumberBet,nine:nineNumberBet,small:smallSizeBet,big:bigSizeBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,globalNumbers:finalNumber,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]});       }
      else if(timeRemaining===5){
        globalNumber++;
        timeRemaining--;
        io.emit('colorPlaced',{voilet:firstBet,green:secondBet,red:thirdBet,zero:zeroNumberBet,one:oneNumberBet,two:twoNumberBet,three:threeNumberBet,four:fourNumberBet,five:fiveNumberBet,six:sixNumberBet,seven:sevenNumberBet,eight:eightNumberBet,nine:nineNumberBet,small:smallSizeBet,big:bigSizeBet})
        io.emit('colorBet', { number: currentNumber, time: timeRemaining,spin:spin, result: winner,globalNumbers:finalNumber,a:lastNumbers[0],b:lastNumbers[1],c:lastNumbers[2],d:lastNumbers[3],e:lastNumbers[4],f:lastNumbers[5],g:lastNumbers[6],h:lastNumbers[7],i:lastNumbers[8],j:lastNumbers[9],k:lastNumbers[10],l:lastNumbers[11]});    
        spin=true
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
        lastNumbers.push(String(finalNumber)+String(winner))
        await storeCurrentData()
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
const storeCurrentData=async()=>{
  try{
    if(globalNumber===0){
      const resultEntry=new Result({
        globalNumber:globalNumber,
        result:winner,
        color:[0,1],
        size:0
      })
      await resultEntry.save()
    }
    else if(globalNumber===1||globalNumber===3||globalNumber===7||globalNumber===9){
      const resultEntry=new Result({
        globalNumber:globalNumber,
        result:winner,
        color:[1],
        size:globalNumber<5?0:1
      })
      await resultEntry.save()
    }
    else if(globalNumber===2||globalNumber===4||globalNumber===6||globalNumber===8){
      const resultEntry=new Result({
        globalNumber:globalNumber,
        result:winner,
        color:[2],
        size:globalNumber<5?0:1
      })
      await resultEntry.save()
    }
    else{
      const resultEntry=new Result({
        globalNumber:globalNumber,
        result:winner,
        color:[0,2],
        size:0
      })
      await resultEntry.save()
    }
  }
  catch(error){
  }
}
const sendColorMoney = async (io, phone, color, number, size, amount,globalNumber) => {
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

    
    if (sender.wallet < amount) {
      io.emit('walletColorUpdated', { phone: phone, error: 'Insufficient Funds' });
      return { success: false, message: 'Insufficient Funds' };
    }

    if (color === 0) {
      firstBet += 2 * amount; 
    } 
    else if (color === 1) {
      secondBet += 2 * amount; // Adjusted for the green
    } 
    else if (color === 2) {
      thirdBet += 2 * amount; // Adjusted for the red
    } 
    else if (size === 0) {
      smallSizeBet += 2 * amount;
    } 
    else if (size === 1) {
      bigSizeBet += 2 * amount;
    } 
    else if (number >= 0 && number <= 9) {
      switch (number) {
        case 0: zeroNumberBet += 9 * amount; break;
        case 1: oneNumberBet += 9 * amount; break;
        case 2: twoNumberBet += 9 * amount; break;
        case 3: threeNumberBet += 9 * amount; break;
        case 4: fourNumberBet += 9 * amount; break;
        case 5: fiveNumberBet += 9 * amount; break;
        case 6: sixNumberBet += 9 * amount; break;
        case 7: sevenNumberBet += 9 * amount; break;
        case 8: eightNumberBet += 9 * amount; break;
        case 9: nineNumberBet += 9 * amount; break;
      }
    } 
    else {
      return { success: false, message: 'Invalid color, size, or number' };
    }


    userTransaction.transactions.push({ color,number,size, amount: -amount,globalNumber:globalNumber,orignalNumber:winner,transactionUpdated:0});
    await userTransaction.save();

    sender.wallet -= amount;
    await sender.save();
    io.emit('walletColorUpdated', { phone, newBalance: sender.wallet, color, size, number,globalNumber });

    return { success: true, message: 'Money sent successfully', newBalance: sender.wallet, color, size, number,globalNumber };
    
  } catch (error) {
    io.emit('walletColorUpdated', { error: error.message });
    throw new Error('Failed to send money. Please try again.');
  }
};

  
  const receiveMoney = async (io, phone, color,number,size,amount,globalNumber) => {
    let winning=0;
    try {
      const [sender, userTransaction] = await Promise.all([
        User.findOne({ phone }),
        LuckyTransaction.findOne({ 
          phone, 
          'transactions.globalNumber': globalNumber 
      })
    ]);

      if (!sender) {
        throw new Error('Sender not found');
      }
      // let newUserTransaction = userTransaction;

      // if (!newUserTransaction) {
      //   newUserTransaction = new LuckyTransaction({
      //     phone,
      //     transactions: []
      //   });
      // }
      if(winner%2===0&&color!==-1&&winner!==""){
        if(color===0&&winner===0){
          winning=amount*2;
        }
        else {
          if(color===2&&winning===0){
            winning=amount*1.5
          }
          else if(color%2===0){
             winning=amount*2
          }
          else{
            winning=amount*0
          }
        }
      }
      else if(color!==-1&&winner!==""){
        if(color===0&&winner===5){
          winning=amount*2;
        }
        else {
          if(color===1&&winner===5){
            winning=amount*1.5
          }
          else if(color%2===1&&winner%2===1){
             winning=amount*2
          }
          else{
            winning=amount*0
          }
        }
      }
      else if(size===0&&winner<5&&winner!==""){
        winning=amount*2
      }
      else if(size===1&&winner>5&&winner!==""){
        winning=amount*2
      }
      else if(number===winner&&winner!==""){
        winning=amount*9
      }
      else{
        winning=amount*0
      }

      let transactionUpdated = false;

      if (userTransaction) {
          const transaction = userTransaction.transactions.find(t => t.globalNumber === globalNumber);

          if (transaction) {
              transaction.orignalNumber = winner;
              transaction.amount = winning===0?transaction.amount:winning; // Update the amount to the winning amount
              transaction.transactionUpdated = true;
              transactionUpdated=1
          }
      } 
  
      const referredUsers = await User.findOne({ refer_id: { $in: sender.user_id } });
      if (referredUsers) {
        const referralBonus = 0.05 * winning;
        referredUsers.referred_wallet += referralBonus;
        let ref = await Ref.findOne({ phone: referredUsers.phone });
        if (ref) {
          ref.referred.push({
            user_id: sender.user_id,
            avatar: sender.avatar,
            amount: referralBonus
          });
        } else {
          ref = new Ref({
            phone: referredUsers.phone,
            referred: [{
              user_id: sender.user_id,
              avatar: sender.avatar,
              amount: referralBonus
            }]
          });
        }
        await Promise.all([referredUsers.save(), ref.save()]);
      }
      sender.wallet +=winning;
      sender.withdrwarl_amount += winning;
      await sender.save();
      if (transactionUpdated) {
        await userTransaction.save();
    }
      await sender.save();
      io.emit('walletColorUpdated', { phone, newBalance: sender.wallet,color,size,number,amount:winning===0?-amount:winning,transactionUpdated:transactionUpdated});
      return { success: true, message: 'Money received successfully',newBalance:sender.wallet,amount:winning===0?-amount:winning };
    } catch (error) {
      throw new Error('Server responded falsely');
    }
  };
  
  const getResultTransactions = async (req, res) => {
    try {
      const resultTransactions = await Result.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(10); // Limit to the last 10 entries
  
      if (!resultTransactions || resultTransactions.length === 0) {
        return res.status(404).json({ error: 'No results found' });
      }
  
      const formattedTransactions = resultTransactions.map(transaction => {
        const date = new Date(transaction.createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        return {
          ...transaction._doc,
          globalNumber: `${formattedDate}${transaction.globalNumber}`
        };
      });
  
      res.status(200).json({ transactions: formattedTransactions });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getColorTransactions = async (req, res) => {
    const { phone } = req.query;
    const currentDate = getCurrentDate();
    const finalNumber = String(currentDate) + String(globalNumber);
    console.log(finalNumber)
    console.log(`>>>>>>>>>last>>>>>>>`,lastTransaction.globalNumber)
    console.log(`>>>>>>isCHeck>>>`,globalNumber===finalNumber)
  
    try {
        const userTransactions = await LuckyTransaction.findOne({ phone });

        if (!userTransactions) {
            return res.status(404).json({ error: 'User not found' });
        }

        const transactions = userTransactions.transactions;
        if (transactions.length === 0) {
            return res.status(200).json({ transactions: [] });
        }

        const lastTransaction = transactions[transactions.length - 1];

        if (lastTransaction.globalNumber !== finalNumber) {
            lastTransaction.transactionUpdated = 1;
            await userTransactions.save(); // Save the updated document
        }

        res.status(200).json({ transactions });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


  
  module.exports = {
    generateAndBroadcastNumber,
    sendColorMoney,
    receiveMoney,
    getResultTransactions,
    initializeGlobalNumber,
    getColorTransactions
  };
  