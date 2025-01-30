const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Expense Tracker" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: html || `<p>${text || 'Password Reset Link'}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false, // Use true for port 465
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Expense Tracker" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//     throw new Error("Failed to send email");
//   }
// };

// module.exports = sendEmail;
