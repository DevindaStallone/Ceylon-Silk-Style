const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://devindastallone:devinda20030215$@ceylonsilkstyle.ktd47.mongodb.net/ceylonsilkstyle?retryWrites=true&w=majority&appName=ceylonsilkstyle", {
       
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
