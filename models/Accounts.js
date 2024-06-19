const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, null: false },
  funds: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema);
