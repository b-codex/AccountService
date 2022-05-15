const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["Name is required"],
    },
    email: {
      type: String,
      required: ["Email is required"],
    },
    password: {
      type: String,
      required: ["Password is required"],
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    report: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserReport",
      },
    ],
    reportResponse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReportResponse",
      },
    ],
    verifyRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VerifyRequest",
      },
    ],
    notification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAdmin", AdminSchema);
