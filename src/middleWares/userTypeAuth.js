const userTypeAuth = (types) => (req, res, next) => {
  if (types.includes(req.user.userType)) {
    return next();
  }
  return res.status(401).json({
    message: `Unauthorized USERTYPE.`,
    success: false,
  });
};

module.exports = userTypeAuth;
