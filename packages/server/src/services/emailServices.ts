import 'dotenv/config';
import sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIPKEY);

const emailService = (
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
): void => {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((err) => {
      console.log(err);
    });
};

export { emailService };
