require('dotenv').config();
const sgMail = require('@sendgrid/mail');

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: data.to, // Change to your recipient
    from: `noreply<${process.env.SENDGRID_EMAIL}>`, // Change to your verified sender
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data,
  };

  try {
    const response = await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = {
  sendEmail,
};
