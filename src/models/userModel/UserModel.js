const mongoose = require("mongoose"),
  UserSchema = new mongoose.Schema(
    {
      // common fields for the employer and employer models

      fullName: {
        type: String,
        required: [true, "Full Name is required"],
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
      },
      _isUserActive: {
        type: Boolean,
        default: true,
      },
      // field for employer
      description: {
        type: String,
        required: [false, "Description is required"],
      },
      phoneNumber: {
        type: String,
        required: [false, "PhoneNumber is required"],
      },
      location: {
        type: String,
        required: [false, "Location is required"],
      },
      role: {
        type: String,
        enum: ["employer", "employee", "oneTime"],
      },
      jobsPosted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "JobPost",
        },
      ],
      reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserReview",
        },
      ],
      verified: {
        type: Boolean,
        default: false,
      },
      profilePicture: {
        type: String,
        default: "",
      },
      //   this models are going to accessed by the employee only
      user_type: {
        type: String,
        // required: t,
        // is going to be accessed by the employee only
        enum: ["One_Time", "FullTime", "partTime"],
      },
      /* A reference to the profession model. */
      // many to many relationship with profession
      profession: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profession",
        },
      ],

      /* A reference to the PreviousExperience model. */
      // one to many relationship with previousExperience
      previousExperience: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PreviousExperience",
        },
      ],
      /* A reference to the EducationBackgrounds model. */
      // many to many relationship with educationalBackground
      educationalBackgrounds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "EducationBackground",
        },
      ],
      // one to many relationship with educationalBackground
      resumeBuilder: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ResumeBuilder",
        },
      ],
      report_Id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserReport",
        },
      ],
      notification: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Notification",
        },
      ],
      referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "References",
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model("User", UserSchema);
