const DB_URI =
  "mongodb+srv://BaleMoya:balemoya123@balemoya.mgq0f.mongodb.net/test";
const SECRET =
  "ee1b63a26c73c6207848f395461476e262275e481eb48b345ea3312b1be22f862dd3eb625ca37119cee3923c3c8634bb8ff0282031172c5618c4de091a4c8bf2";
const REFRESH_TOKENS =
  "d834a860b83d07016da1b7e9e9e4205d4c6c1ca8adeeac57e72f8c0bb20e6568d48b74fd6a1b0aca176d85c1600f10fbd85b0b48ad4438d08e0aff1562aecb92";
if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}
if (process.env.ACCESS_TOKENS_SECRET) {
  SECRET = process.env.ACCESS_TOKENS_SECRET;
}
if (process.env.REFRESH_TOKENS_SECRET) {
  REFRESH_TOKENS = process.env.REFRESH_TOKENS_SECRET;
}

module.exports = {
  DB_URI,
  SECRET,
  REFRESH_TOKENS,
};
