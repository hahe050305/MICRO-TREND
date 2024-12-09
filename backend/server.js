const express = require('express');
const Instamojo = require('instamojo-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Set up CORS for cross-origin requests
app.use(cors());

// Use bodyParser to parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Key and Auth Token from your Instamojo Dashboard (sandbox mode for testing)
const API_KEY = 'edb2a9c1450d9481a73d9c51a4216906';    // Replace with your actual API key (sandbox key)
const AUTH_TOKEN = '3ea076e0b5b3ef1948a1b46b3ca0e790';  // Replace with your actual auth token (sandbox token)

Instamojo.setKeys(API_KEY, AUTH_TOKEN);

// Route to create payment request (without user input)
app.post('/create-payment', (req, res) => {
  // Hardcoded values for testing payment
  const amount = 100;  // Example amount ($100)
  const name = 'Test User';  // Hardcoded name
  const email = 'testuser@example.com';  // Hardcoded email
  const phone = '9876543210';  // Hardcoded phone number

  const data = new Instamojo.PaymentData();
  data.purpose = 'Test Payment';  // Define your purpose for the payment
  data.amount = amount;  // Fixed amount for testing
  data.buyer_name = name;  // Hardcoded name
  data.email = email;  // Hardcoded email
  data.phone = phone;  // Hardcoded phone number
  data.send_email = true;
  data.send_sms = true;
  data.redirect_url = 'http://localhost:5000/payment-success'; // URL to handle payment success
  data.webhook = 'http://localhost:5000/payment-webhook'; // Webhook URL for payment status updates

  // Create payment request using Instamojo API
  Instamojo.createPayment(data, function (error, response) {
    if (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    } else {
      const responseObj = JSON.parse(response);
      const paymentUrl = responseObj.payment_request.longurl;
      res.status(200).send({ paymentUrl });  // Send the payment URL to the client for redirection
    }
  });
});

// Handle success and failure URLs
app.get('/payment-success', (req, res) => {
  const paymentRequestId = req.query.payment_request_id;
  Instamojo.getPaymentDetails(paymentRequestId, (error, response) => {
    if (error) {
      res.send('Payment Failed');
    } else {
      const responseObj = JSON.parse(response);
      const paymentStatus = responseObj.payment.payment_status;
      if (paymentStatus === 'Credit') {
        res.send('Payment Successful');
      } else {
        res.send('Payment Failed');
      }
    }
  });
});

// Webhook to handle payment status updates
app.post('/payment-webhook', (req, res) => {
  const paymentData = req.body;
  // Handle the webhook notification here (success, failure, or pending)
  console.log('Webhook Data:', paymentData);
  // Perform necessary actions (e.g., update order status) based on payment status
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
