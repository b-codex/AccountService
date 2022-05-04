const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    // reviewerCustomerId: {
    //   type: String,
    //   required: [false, "reviewerId is required"],
    //   unique: true,
    // },
    // revieweeCustomerId: {
    //   type: String,
    //   required: [false, "revieweeId is required"],
    //   lowercase: true,
    // },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
      required: [false, "Password is required"],
    },
    // many to many relationship with Users
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserReview", ReviewSchema);
