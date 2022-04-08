export const Environment = {
  MONGODB_URI: String(
    process.env.MONGODB_URI || "MONGODB_URI=mongodb://localhost:27017/test",
  ),
  TOKEN_LIFE: String(process.env.TOKEN_LIFE),
  TOKEN_SECRET: String(process.env.TOKEN_SECRET),
  URL_FE: String(process.env.URL_FE||""),
  MAIL_USER: String(process.env.MAIL_USER||""),
  MAIL_PASS: String(process.env.MAIL_PASS||""),
};
