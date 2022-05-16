const router = require("express").Router();
const User = require("../models/userModel/UserModel");

/* Importing the functions from the Company.js file. */
const {
  user_register,
  user_login,
  user_auth,
  serialize_user,
  role_auth,
  update_user,
  check_for_banned_user,
  change_password,
  get_verified,
} = require("../controllers/auth");
/* Importing the roles from the roles.js file. */
const roles = require("../controllers/roles");

/* This is a route that is used to get the profile of the user. */

router.get(
  "/profile",
  user_auth,
  role_auth([roles.EMPLOYEE, roles.EMPLOYER]),
  async (req, res) => {
    return res.json(
      await User.findOne({ _id: req.user._id }).select(["-password"])
    );
  }
);

/* This is a route that is used to get the profile of the user. */
router.get(
  "/current",
  user_auth,
  role_auth([roles.EMPLOYEE, roles.EMPLOYER]),
  (req, res, next) => {
    return res.json(serialize_user(req.user));
  }
);
/* A route that is used to register a user Employer. */
router.post("/register-userCompany", async (req, res) => {
  return await user_register(req.body, roles.EMPLOYER, res);
});

/* This is a route that is used to register a user Employee. */
router.post("/register-userEmployee", async (req, res) => {
  return await user_register(req.body, roles.EMPLOYEE, res);
});

/* This is a route that is used to login the user. */
router.post("/login", check_for_banned_user(User), async (req, res) => {
  return await user_login(req.body, res);
});

/**
 * Getting all the users
 */
/* This is a route that is used to get all the users. */
router.get("/", user_auth, role_auth([roles.ADMIN]), async (req, res) => {
  try {
    const user = await User.find().exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json("no user is found", err);
  }
});
// /* Getting all the users and populating the profession. */
// router.get(
//   "/employee",
//   user_auth,
//   role_auth([roles.EMPLOYEE]),
//   async (req, res) => {
//     try {
//       const user = await User.find().populate("profession").exec();
//       const { profession } = user._doc;
//       res.status(200).json(profession);
//     } catch (err) {
//       res.status(404).json("no user is found", err);
//     }
//   }
// );
/* This is a route that is used to get the profile of the user. */
router.get("/:id", user_auth, role_auth([roles.ADMIN]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate().exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json("no user is found", err);
  }
});

/* This is a route that is used to get the profile of the user. */
router.get(
  "/notification/:id",
  user_auth,
  role_auth([roles.EMPLOYEE, roles.EMPLOYER]),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("notification")
        .exec();
      const { notification } = user._doc;
      res.status(200).json(notification);
    } catch (err) {
      res.status(404).json("no user is found", err);
    }
  }
);

// router.get("/", user_auth, role_auth([roles.EMPLOYEE]), async (req, res) => {
//   return res.json(await userProfession.find({ user: req.user._id }));
// });

/* This is a route that is used to get the profile of the user. */

/* This is a route that is used to update the user. */
router.put(
  "/update",
  user_auth,
  role_auth([roles.EMPLOYER, roles.EMPLOYEE]),
  async (req, res, next) => {
    return await update_user(req.user._id, req.body, res);
  }
);

/* This is a route that is used to update the user. */
router.put(
  "/update-password",
  user_auth,
  role_auth([roles.EMPLOYER, roles.EMPLOYEE]),
  async (req, res, next) => {
    return await change_password(
      req.user._id,
      req.body.old_password,
      req.body.new_password,
      res
    );
  }
);

/* Deleting the user. */
router.delete("/:id", user_auth, async (req, res, next) => {
  try {
    let x = await User.deleteOne({ _id: req.user._id });
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
