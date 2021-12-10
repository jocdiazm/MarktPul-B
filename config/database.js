const mongoose = require('mongoose')

const URI ='mongodb+srv://marktpul_user:SVO87P7U0cchznst@marktcluster.ikcnf.mongodb.net/Markt-Pul?retryWrites=true&w=majority'

async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;