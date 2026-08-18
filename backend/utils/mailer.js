const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password (not your regular password)
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Smart Interview Prep" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #6366f1; margin-bottom: 8px;">Password Reset OTP</h2>
        <p style="color: #475569;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #1e293b; text-align: center; margin: 24px 0;">
          ${otp}
        </div>
        <p style="color: #94a3b8; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendOTPEmail };
