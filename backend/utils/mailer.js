const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message, registrationId) => {
  try {
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; }
        .container { max-width: 600px; margin: auto; }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212 !important;
            color: #ffffff !important;
          }
          .container {
            background-color: #1e1e1e !important;
          }
        }
      </style>
    </head>
    <body style="background-color: #f4f7fa; margin: 0; padding: 20px;">
      <div class="container" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: #0a0a0a; padding: 25px 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: #ffc600; font-weight: 700;">Tech<span style="color: #37abc8;">TANK</span></h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px 40px; color: #0a0a0a;">
          <h2 style="margin-top: 0; margin-bottom: 20px; color: #0a0a0a; font-size: 22px; font-weight: 600;">${subject}</h2>
          <p style="margin-bottom: 25px; line-height: 1.6; font-size: 16px; color: #0a0a0a;">${message}</p>
          
          <!-- Unique ID -->
          <p style="margin-top: 20px; font-size: 14px; font-weight: 500; color: #0a0a0a;">
            <strong>Your Unique Team ID:</strong> ${registrationId}
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="https://techtankrvce.com" style="display: inline-block; background-color: #37abc8; color: #ffffff; text-decoration: none; font-weight: 600; padding: 14px 28px; border-radius: 8px; font-size: 16px; transition: all 0.3s ease;">Visit Website</a>
          </div>
          
          <!-- Contact Info -->
          <p style="margin: 0; font-size: 15px; color: #0a0a0a; font-weight: 500;">For any queries, contact us at: <a href="mailto:support@techtank.com" style="color: #37abc8; text-decoration: none; font-weight: 600;">support@techtank.com</a></p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #0a0a0a; font-size: 14px;">&copy; 2025 Tech Tank. All rights reserved.</p>
          <p style="margin-top: 8px; font-size: 12px; color: #0a0a0a;">
            <a href="#" style="color: #37abc8; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
            <a href="#" style="color: #37abc8; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: "Tech Tank" <${process.env.}>,
      to,
      subject,
      html: emailTemplate,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Email failed to send!" };
  }
};

module.exports = sendEmail;