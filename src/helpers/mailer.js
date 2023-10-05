const nodemailer = require("nodemailer");

  const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PWD
    }
});

  async function sendEmail(cardDetails, email) {
    const info = await client.sendMail({
      from: `"Neo invitaion cards" <${process.env.EMAIL_ID}>`, // sender address
      to: "", // list of receivers
      bcc:`${email.join(',')}`,
      subject: cardDetails.title, // Subject line
      //text: `${cardDetails.description}`, // plain text body
      html: `<div>${cardDetails.description}<br /><br /><b>Venue :- ${cardDetails.location}</b>
      <br /><b>Date :- ${cardDetails.date}</b><br /><b>Time :- ${cardDetails.time}</b></div>`, // html body
    });
    return info.messageId;
  }

  module.exports = {
    sendEmail
};