const nodemailer = require("nodemailer");

// Function to send mail to user's with given email
module.exports.sendEmail = (email, amount) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  // if amount is positive then user has to pay, else he has to recieve money.
  let action;
  if (amount > 0) {
    action = "will pay";
  } else {
    action = "will get";
  }
  let mailOptions = {
    from: "anuragsingh8745@gmail.com",
    to: email,
    subject: "Split-Money - Summary",
    text: `You ${action} : Rs.${Math.abs(amount)}`,
  };

  // console.log(mailOptions);

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      return;
    }
    // console.log("Email sent successfully");
  });
};
