export const Environment = {
  MONGODB_URI: String(
    process.env.MONGODB_URI || "MONGODB_URI=mongodb://localhost:27017/test",
  ),
};
