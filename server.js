// Load Express
const express = require("express");
const app = express();
// cors
const cors = require("cors");
// body parser to post json data in to database
const bodyParser = require("body-parser");
// Load Mongoose
const mongoose = require("mongoose");

// port
const port = process.env.PORT || 5655

const passport = require("passport");
// dotenv

const { DB_URI } = require("./src/config");
// route
// const userProfessionalRoute = require("./src/routes/professionalRoute");
// const userCompanyRoute = require("./src/routes/companyRoute");
const userEducationalBackgroundRoute = require("./src/routes/educationalBackgroundRoute");
const userReferenceRoute = require("./src/routes/referenceRoute");
const userPreviousEducationRoute = require("./src/routes/previousEducationRoute");
const userProfessionRoute = require("./src/routes/professionRoute");
const user = require("./src/routes/users");
const admin = require("./src/routes/admin");
const reviews = require("./src/routes/reviews");
const report = require("./src/routes/reports");
const reportResponse = require("./src/routes/reportResponse");

// MiddleWares
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(DB_URI)
  .then(console.log(" Database is up and running"))
  .catch((err) => console.log(err));

require("./src/middleWares/passport")(passport);
// setting the route for the book

app.use("/api/admin", admin);
app.use("/api/users", user);
app.use(
  "/microservice/accountService/employee/previousEducation",
  userPreviousEducationRoute
);
app.use("/microservice/accountService/employee/reviews", reviews);
app.use("/microservice/accountService/employee/reports", report);
app.use("/microservice/accountService/employee/response", reportResponse);
app.use(
  "/microservice/accountService/employee/educationalBackground",
  userEducationalBackgroundRoute
);
app.use("/microservice/accountService/employee/reference", userReferenceRoute);
app.use(
  "/microservice/accountService/employee/profession",
  userProfessionRoute
);

app.listen(port, () => {
  console.log("Account Service is up and running on port " + port);
});
