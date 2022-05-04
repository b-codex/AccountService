const User = require("../models/userModel/UserModel");
const bcrypt = require("bcrypt");
// const moment = require("moment");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config");
const moment = require("moment");
/**
 * Register Users
 */
/**
 * It creates a new user in the database
 * @param user_dets - { user details}
 * @param role - "professional"
 * @param res - is the response object
 * @returns a promise.
 */

const user_register = async (user_dets, role, res) => {
  try {
    // //Validate username
    let username_not_taken = await validate_username(user_dets.fullName);
    if (!username_not_taken) {
      return res.status(400).json({
        message: "Username already taken.",
        success: false,
      });
    }
    //Validate email
    let email_not_taken = await validate_email(user_dets.email);
    if (!email_not_taken) {
      return res.status(400).json({
        message: "email already taken.",
        success: false,
      });
    }

    const password = await bcrypt.hash(user_dets.password, 12);

    //Create the User
    const new_user = new User({
      ...user_dets,
      role,
      password,
    });
    let resp = await new_user.save();
    return res.status(201).json({
      message: "Registration successful.",
      success: true,
      user: serialize_user(resp),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `unable to create your account`,
      success: false,
    });
    // TODO Logging with winston
  }
};
/**
 * Login Users
 */
/**
 * It checks if the user exists in the database, if it does, it checks if the password matches, if it
 * does, it creates a token and sends it back to the user
 * @param user_creds - {user cred}
 * @param res - response object
 * @returns The user object is being returned.
 */
const user_login = async (user_creds, res) => {
  let { fullName, password, email } = user_creds;
  // Check username or email
  const user = await User.findOne({
    $or: [{ fullName: fullName }, { email: email }],
  });
  if (!user) {
    return res.status(404).json({
      message: `There is not an account with this email or username`,
      success: false,
    });
  }
  let password_match = await bcrypt.compare(password, user.password);
  if (password_match) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        fullName: user.fullName,
        email: user.email,
        // password:user.password
      },
      SECRET,
      { expiresIn: "15 days" }
    );
    let result = {
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      // password:user.password,
      token: `Bearer ${token}`,
      expiryDate: moment().add(200, "hours"),
    };
    return res.status(200).json({
      ...result,
      message: `login successful`,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: `Invalid credentials!`,
      success: false,
    });
  }
};
/**
 * If a user is found with the same fullName, return false, otherwise return true.
 * @param fullName - The full name of the user
 * @returns A function that takes a fullName as an argument and returns a boolean.
 */
const validate_username = async (fullName) => {
  let user = await User.findOne({ fullName });
  return user ? false : true;
};
const validate_email = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};
/**
 * Passport middleware
 */
/* A middleware that checks if the user is authenticated. */
const user_auth = passport.authenticate("jwt", { session: false });

/**
 *  Update User middleware
 */

/**
 * It updates a user's record in the database.
 * </code>
 * @param id - The id of the user you want to update
 * @param _user - The user object that is sent from the frontend
 * @param res - The response object
 * @returns a promise.
 */

const update_user = async (id, _user, res) => {
  try {
    let user = await User.findById(id);
    //Validate username
    let username_not_taken = await validate_username(_user.name);
    if (!username_not_taken && user._id === id) {
      return res.status(400).json({
        message: "Username already taken.",
        success: false,
      });
    }
    //Validate email
    let email_not_taken = await validate_email(_user.email);
    if (!email_not_taken && user._id === id) {
      return res.status(400).json({
        message: "email already taken.",
        success: false,
      });
    }
    user.role = _user.role || user.role;
    user.email = _user.email || user.email;
    user.fullName = _user.fullName || user.fullName;
    user.description = _user.description || user.description;
    user.phoneNumber = _user.phoneNumber || user.phoneNumber;
    user.location = _user.location || user.location;

    //...Add the rest like this
    await user.save();
    return res.status(200).json({
      message: `Records updated successfully.`,
      success: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `unable to update your account`,
      success: false,
    });
    // TODO Logging with winston
  }
};

/**
 * Change Password
 */
/**
 * It takes in a user id, old password, new password and a response object. It then checks if the old
 * password matches the one in the database. If it does, it updates the password with the new one
 * @param id - The id of the user
 * @param old_password - The password that the user is currently using
 * @param new_password - "12345678"
 * @param res - response object
 * @returns a promise.
 */
const change_password = async (id, old_password, new_password, res) => {
  // TODO Check password strength
  try {
    const user = await User.findById(id);
    let password_match = await bcrypt.compare(old_password, user.password);
    if (!password_match && new_password) {
      //TODO Change this later on password strength check
      return res.status(403).json({
        message: `Incorrect Password.`,
        success: false,
      });
    } else {
      user.password = await bcrypt.hash(new_password, 12);
      await user.save();
      return res.status(200).json({
        message: `Password updated successfully.`,
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `unable to change your password.`,
      success: false,
    });
    // TODO Logging with winston
  }
};

/**
 * Check role middleware
 */
/**
 * If the user's role is included in the roles array, then return next() else return a 401 error.
 * @param roles - An array of roles that are allowed to access the route.
 * @returns A function that takes 3 arguments.
 */
const role_auth = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.status(401).json({
    message: `Unauthorized.`,
    success: false,
  });
};
/**
 * It takes a user object and returns a new object with only the properties we want to expose to the
 * client
 * @param user - The user object that you want to serialize.
 * @returns The user object is being returned.
 */
const serialize_user = (user) => {
  return {
    role: user.role,
    verified: user.verified,
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    // password: user.password,
    // frist_name: user.frist_name,
    // last_name: user.last_name,
  };
};
module.exports = {
  update_user,
  change_password,
  user_register,
  user_login,
  user_auth,
  serialize_user,
  role_auth,
};
