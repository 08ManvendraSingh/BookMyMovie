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

app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebHooks
);

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.FRONTEND_URL.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Block the origin
    }
  },
  credentials: true, // Allow cookies and headers
};

// Use the CORS middleware
app.use(cors(corsOptions));

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
