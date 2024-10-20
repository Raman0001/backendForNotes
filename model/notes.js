const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String, // String is shorthand for {type: String}
    note: String,
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Note", notesSchema);