const express = require("express");
const bookingRouter = express.Router();
const userAuth = require("../middlewares/auth");
const Shows = require("../models/shows");
const Booking = require("../models/booking");
const stripe = require("stripe");

bookingRouter.post("/booking", userAuth, async (req, res) => {
  try {
    const { showId, selecteSeats } = req.body;
    const user = req.user;

    const isShowAvailable = await Shows.findById({ _id: showId }).populate("movie");
    if (!isShowAvailable) {
      return res.status(400).json({
        message: "Show not available",
        success: false,
        error: true,
      });
    }

    const occupiedSeats = isShowAvailable.occupiedSeats;

    const isSeatAlredayTaken = selecteSeats.some((seat) => occupiedSeats[seat]);
    if (isSeatAlredayTaken) {
      return res.status(400).json({
        message: "One or more seats are already booked",
        success: false,
        error: true,
      });
    }

    const bookingAmount = isShowAvailable.showPrice * selecteSeats.length;

    const booking = new Booking({
      user: user._id,
      show: showId,
      bookingAmount,
      bookedSeats: selecteSeats,
    });

    selecteSeats.map(
      (seat) => (isShowAvailable.occupiedSeats[seat] = user._id)
    );

    isShowAvailable.markModified("occupiedSeats");

    await isShowAvailable.save();

    await booking.save();

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isShowAvailable?.movie?.movieName,
            },
            unit_amount: Math.floor(booking?.bookingAmount) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/loading/myBooking`,
      cancel_url: `${process.env.FRONTEND_URL}/myBooking`,
      mode: "payment",
      metadata: {
        bookingId: booking?._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    booking.paymentLink = session.url;
    await booking.save();

    res.status(200).json({
      url: session.url,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

bookingRouter.get("/seats/:showId", async (req, res) => {
  try {
    const { showId } = req.params;

    const show = await Shows.findById({ _id: showId });
    if (!show) {
      return res.status(400).json({
        message: "Show not available",
        success: false,
        error: true,
      });
    }

    const occupiedSeats = Object.keys(show.occupiedSeats);

    res.status(200).json({
      data: occupiedSeats,
      message: "fetched already booked seats",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

module.exports = { bookingRouter };
