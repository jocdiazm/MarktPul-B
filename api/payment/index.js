const { Router } = require('express');

const {
  makePaymentHandlers,
} = require('./payment.controller');
const { isAuthenticated } = require('../auth/auth.services');

const router = Router();

router.post('/make-payment', isAuthenticated, makePaymentHandlers);

module.exports = router;
