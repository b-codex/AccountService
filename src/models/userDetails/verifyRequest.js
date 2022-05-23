const mongoose = require("mongoose");
const VerifyRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  verificationDocument: {
    type: String,
    required: [true, "MUST BE FIELD"],
    default: "",
  },
  verificationStatus: {
    type: String,
    // required: t,
    enum: ["failed", "verified", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("VerifyRequest", VerifyRequestSchema);
