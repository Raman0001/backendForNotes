const mongoose = require("mongoose");
const dbConnnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.error(error);
    }
};

module.exports = { dbConnnect }