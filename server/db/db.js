const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the database!")
    } catch (error) {
        console.error("Failed to connect to the database! :", error)
    }
}


module.exports = dbConnection