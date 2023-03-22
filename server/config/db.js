const mongoose = require("mongoose");

//?Database connection
const connectDB = async () => {
  try {
    /**
     * This line is to supress deprecation warning
     * also allow any schema which are not added to the default schema to be used in the query
     */
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
