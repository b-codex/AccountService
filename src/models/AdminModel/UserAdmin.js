const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Admin"],
      default: "Admin",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAdmin", AdminSchema);
