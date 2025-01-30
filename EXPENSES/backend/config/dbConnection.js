const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Connected: ${connect.connection.host} (${connect.connection.name})`);
    } catch (err) {
        console.error("Database Connection Error:", err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
