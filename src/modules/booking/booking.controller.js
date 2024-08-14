import JWT from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config()

import { bookingModel } from "../../../DB/models/booking.model.js";
import { tripModel } from "../../../DB/models/trip.model.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";
import { availability } from "../../../DB/models/availability.model.js";
import { sendEmailOrderConfirm } from "../../email/sendEmail.js";


const createBooking = catchError(async (req, res, next) => {
  let { Adults, children, date } = req.body;

  let trip = await tripModel.findByPk(req.params.id);
  !trip && next(new apiError("trip not found"));

  let booking = new bookingModel(req.body);
  booking.trip = req.params.id;
  booking.totalPrice = trip.priceAfterDis * (Adults + children);
  await booking.save();
  let available = await availability.findOne({ where: { date }});
  if(!available){
    let newAvail = new availability();
    newAvail.date = date;
    newAvail.booked = newAvail + Adults + children;
    await newAvail.save();
  }else{
    available.booked = available.booked + Adults + children;
    await available.save();
  };
  
  let token = JWT.sign(
    { bookingId: booking.id, tripId: trip.id },
    "discovery_sharm"
  );

  res.json({ msg: "success", booking, token });
});

const addContent = catchError(async (req, res, next) => {
  let addContent = await bookingModel.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      time: req.body.time,
      hotel: req.body.hotel,
      RoomNumber: req.body.RoomNumber,
    },
    {
      where: { id: req.booking.id },
    }
  );
  if (addContent === 0) {
    next(new apiError("update failed"));
  } else {
    res.json({ msg: "success" });
  }
});

const getBookinkg = catchError(async (req, res, next) => {
  res.json(req.booking);
});

const bookingProcessing = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new apiError("not token provide", 401));

  let decoded = JWT.verify(token, "discovery_sharm");

  let booking = await bookingModel.findByPk(decoded.bookingId);
  if (!booking) return next(new apiError("booking not found"));

  let trip = await tripModel.findByPk(decoded.tripId);
  if (!trip) return next(new apiError("trip not found"));

  req.booking = booking;
  req.trip = trip;
  next();
});

const checkOutSession = async (req, res, next) => {
  const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
  const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
  const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

  let booking = await bookingModel.findByPk(req.booking.id);
  if (booking.paid) next(new apiError("booking is already paid", 403));
  let totalPrice = booking.totalPrice;

  // Step 1: Get the authentication token
  //
  const authResponse = await axios.post(
    "https://accept.paymobsolutions.com/api/auth/tokens",
    {
      api_key: PAYMOB_API_KEY,
    }
  );
  const authToken = authResponse.data.token;

  const orderResponse = await axios.post(
    "https://accept.paymobsolutions.com/api/ecommerce/orders",
    {
      auth_token: authToken,
      delivery_needed: false,
      amount_cents: totalPrice * 100,
      currency: "EGP",
      items: [],
    }
  );
  const orderId = orderResponse.data.id;

  const paymentKeyResponse = await axios.post(
    "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
    {
      auth_token: authToken,
      amount_cents: totalPrice * 100,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: "803",
        email: booking.email,
        floor: "42",
        first_name: booking.name,
        street: "Ethan Land",
        building: "8028",
        phone_number: booking.phone,
        shipping_method: "PKG",
        postal_code: "01898",
        city: "Jaskolskiburgh",
        country: "CR",
        last_name: booking.name,
        state: "Utah",
      },
      currency: "EGP",
      integration_id: PAYMOB_INTEGRATION_ID,
    }
  );
  const paymentKey = paymentKeyResponse.data.token;
  booking.orderId = orderId;
  await booking.save();

  res.json({
    msg: "success",
    paymentKey,
    iframeId: PAYMOB_IFRAME_ID,
    URL: `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`,
  });
};

const createOnlineOrder = async (req, res) => {
  try {
    const receivedHmac = req.query.hmac;

    const PAYMOB_HMAC = process.env.PAYMOB_HMAC; // Replace with your actual HMAC key
    console.log(PAYMOB_HMAC);
    const relevantData = {
      amount_cents: req.query.amount_cents,
      created_at: req.query.created_at,
      currency: req.query.currency,
      error_occured: req.query.error_occured,
      has_parent_transaction: req.query.has_parent_transaction,
      id: req.query.id,
      integration_id: req.query.integration_id,
      is_3d_secure: req.query.is_3d_secure,
      is_auth: req.query.is_auth,
      is_capture: req.query.is_capture,
      is_refunded: req.query.is_refunded,
      is_standalone_payment: req.query.is_standalone_payment,
      is_voided: req.query.is_voided,
      orderid: req.query.order,
      owner: req.query.owner,
      pending: req.query.pending,
      source_data_pan: req.query["source_data.pan"],
      source_data_sub_type: req.query["source_data.sub_type"],
      source_data_type: req.query["source_data.type"],
      success: req.query.success,
    };

    const sortedQueryKeys = Object.keys(relevantData).sort();
    const sortedQueryParams = sortedQueryKeys
      .map((key) => `${relevantData[key]}`)
      .join("");
   
    console.log(sortedQueryParams);
    const calculatedHmac = crypto
      .createHmac("sha512", PAYMOB_HMAC)
      .update(sortedQueryParams)
      .digest("hex");

      console.log(calculatedHmac);
      console.log(receivedHmac);
    if (calculatedHmac !== receivedHmac) {
      return res.status(400).send("Webhook signature verification failed");
    }
    const booking = await bookingModel.findOne({
      where: { orderId: relevantData.orderid },
    });
    if (!booking) {
      return res.status(400).send("Booking not found");
    }

    await card(booking, res);
    res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

async function card(data, res) {
  let booking = await bookingModel.findByPk(data.id);
  if (!booking) throw new Error("Booking not found");

  let available = await availability.findOne({ where: { date: booking.date } });
  if (!available)
    throw new apiError("No available ticket for the specified date", 404);

  const order = {
    user: booking.email,
    orderItems: [
      {
        tripId: booking.trip,
        quantity: booking.Adults + booking.children + booking.children_s,
      },
    ],
    totalOrderPrice: data.amount_cents / 100,
    shippingAddress: data.billing_data,
    orderCode: Math.floor(1000 + Math.random() * 9000).toString(),
    paymentType: "card",
    isPaid: true,
    paidAt: new Date(),
  };

  await availability.update(
    { booked: available.booked + order.orderItems[0].quantity },
    { where: { date: booking.date } }
  );

  await bookingModel.update({ paid: true }, { where: { id: data.id } });
  await sendEmailOrderConfirm(booking);
}
export {
  createBooking,
  addContent,
  getBookinkg,
  bookingProcessing,
  checkOutSession,
  createOnlineOrder,
};
