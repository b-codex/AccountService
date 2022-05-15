require("dotenv").config();
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;
const REFRESH_TOKENS = process.env.REFRESH_TOKENS;

CLIENT_URL = "http://localhost:3000";
if (process.env.CLIENT_URL) {
  CLIENT_URL = process.env.CLIENT_URL;
}

module.exports = {
  DB_URI,
  SECRET,
  REFRESH_TOKENS,
  CLIENT_URL,
};
