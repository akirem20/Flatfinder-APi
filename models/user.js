const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date },
    isadmin: { type: Boolean, default: false },
    flats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flat' }]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('User', User);
