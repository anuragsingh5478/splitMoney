const nodemailer = require("nodemailer");

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

  console.log(mailOptions);

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
