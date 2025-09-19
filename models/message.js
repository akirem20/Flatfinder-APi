const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    content: { type: String, required: true },
    flatid:{type: mongoose.Schema.Types.ObjectId, ref:'Flat', required: true},
    senderid:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
},
{timestamps:{createdAt:'created_at'}}
);

module.exports = mongoose.model('Message', Message);