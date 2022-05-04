const mongoose = require("mongoose");
const ResumeBuilderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    unique: true,
  },
  experience: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  profession: {
    type: String,
    required: false,
    // required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  achievements: {
    type: String,
    required: false,
  },
  projects: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  interests: {
    type: String,
    required: false,
  },
  certificate: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("ResumeBuilder", ResumeBuilderSchema);
