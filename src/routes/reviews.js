const router = require("express").Router();
const Reviews = require("../models/Reviews/reviews");

/* Importing the functions from the Company.js file. */
const {
  user_register,
  user_login,
  user_auth,
  serialize_user,
  role_auth,
  update_user,
  change_password,
} = require("../controllers/auth");
/* Importing the roles from the roles.js file. */
const roles = require("../controllers/roles");

// router.get("/", user_auth, role_auth([roles.EMPLOYEE]), async (req, res) => {
//   return res.json(await userProfession.find({ user: req.user._id }));
// });
router.get(
  "/:id",
  user_auth,
  role_auth([roles.EMPLOYEE, roles.EMPLOYER]),
  async (req, res) => {
    try {
      const reviews = await Reviews.findById({
        _id: req.params.id,
      });
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
/* This is a route that is used to get the reviews of the user. */
router.post(
  "/reviews",
  user_auth,
  role_auth([roles.EMPLOYEE, roles.EMPLOYER]),
  async (req, res) => {
    try {
      let reviews = new Reviews({
        ...req.body,
        user: req.user._id,
      });
      let save_reviews = await reviews.save();
      return res.status(201).json({
        message: "reviews Created Successfully.",
        success: true,
        reviews: save_reviews,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Couldn't create the task",
        success: false,
      });
    }
  }
);

router.delete("/:id", user_auth, async (req, res, next) => {
  try {
    let x = await Reviews.deleteOne({ _id: req.user._id });
    console.log(x);
    return res.status(200).json({
      message: "Deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting.",
      success: false,
    });
  }
});

module.exports = router;
