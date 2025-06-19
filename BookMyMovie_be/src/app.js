const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("../src/config/database");
const { authRouter } = require("./routes/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { movieRouter } = require("./routes/movie");
const { showRouter } = require("./routes/show");
const { bookingRouter } = require("./routes/booking");
const { stripeWebHooks } = require("./routes/stripeWebhook");
const app = express();

dotenv.config();

app.use('/api/stripe',express.raw({type:"application/json"}),stripeWebHooks)

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", movieRouter);
app.use("/", showRouter);
app.use("/", bookingRouter);

connectDb()
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, (req, res) => {
      console.log("successfully listien on port 8008");
    });
  })
  .catch((err) => {
    console.log("error in connecting to database");
  });
