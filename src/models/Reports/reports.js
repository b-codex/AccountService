const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
  {
    reportedReason: {
      type: String,
      required: true,
    },
    // many to many relationship admin
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    reportStatus: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "",
    },
    reportResponse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportResponse",
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comment: {
      type: String,
      required: [true, "Password is required"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("UserReport", ReportSchema);
