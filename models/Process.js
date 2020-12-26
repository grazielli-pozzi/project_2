const mongoose = require('mongoose');
const { Schema } = mongoose;

const processSchema = new Schema({
    processNumber: { type: String, required: true },
    complainer: { type: String, required: true },
    claimed: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
},
{
    timestamps: true,
});

const Process = mongoose.model('process', processSchema);

module.exports = Process;