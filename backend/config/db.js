const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected", conn.connection.host);
  } catch (error) {
    console.log("Error Connection to MongoDB. ERROR: ", error.message);
    process.exit();
  }
};

module.exports = connect_db;
