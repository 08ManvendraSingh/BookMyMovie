const stripe = require("stripe");
const Booking = require("../models/booking");

const stripeWebHooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(500).send(`WebHook Error:${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];
        const { bookingId } = session.metadata;

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        console.log("Session List:", sessionList);
console.log("Metadata Booking ID:", bookingId);
        break;
      }

      default:
        console.log("unhandled event type:", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.log("webhook processing error:", event);
    res.status(500).send(`Internal server error`);
  }
};

module.exports={stripeWebHooks};