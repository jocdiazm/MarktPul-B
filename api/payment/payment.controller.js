const Payment = require('./payment.model');
const {
  makePayment,
  createCardToken,
  createCustomer
} = require('./payment.service');


async function makePaymentHandlers(req, res) {
  try {

    const { user, body: payment } = req;

    let userData = user
      if(!user?.billing?.creditCards?.[0]?.tokenId){
        const createToken = await createCardToken(payment, user)
        const customer = await createCustomer(createToken)
        userData = customer
      }
    const { data, success } = await makePayment(userData, payment);
    if (!success) {
      return res.status(400).json(data);
    }
    await Payment.create({
      userId: user._id,
      refId: data.recibo,
      bill: payment.bill,
      description: payment.description,
      value: payment.value,
      tax: payment?.tax,
      taxBase: payment?.taxBase,
      currency: payment.currency
    });

    return res.status(200).json({ success, data });
  } catch (error) {
    res.status(500).send({
      message: 'Error realizando el pago',
      error,
    });
  }
}

module.exports = {
  makePaymentHandlers,
};
