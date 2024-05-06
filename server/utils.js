const nodemailer = require("nodemailer");

function checkEmail(email) {
  if (!email) return false;
  let at = email.indexOf("@");

  if (email.match(/[!#/\$%^&()+,'"|<>;{}:*=`~]/, "i")) return false;

  if (at === -1) return false;

  let domain = email.substr(email.indexOf("@") + 1);

  if (!domain) return false;

  let suf = domain.indexOf(".");

  if (suf === -1) return false;

  let topLevelDomain = domain.substring(domain.indexOf(".") + 1);

  if (!topLevelDomain || topLevelDomain.length < 2) return false;

  return true;
}

async function sendMail(from, subject, to, html, text) {
  if (!to) throw new Error("Receiver address not specified");
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const message = await transporter.sendMail({
      from: `"${from}" <${process.env.USER}>`,
      subject,
      to,
      html,
      text,
    });

    console.log("Success: ", message?.messageId);
  } catch (error) {
    console.error("mail", error);
    return error?.message;
  }
}

module.exports = { checkEmail, sendMail };
