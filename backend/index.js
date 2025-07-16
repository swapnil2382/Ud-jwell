require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db/db");

const port = process.env.PORT || 3000;

//DATABASE & SERVER CONNECTION
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
