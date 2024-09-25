import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  }
})

const sendWelcomeEmail = async (fullname) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dipendraboyaju222@gmail.com',
    subject: 'Welcome to Our Platform!',
    html: `
      <h2>Welcome to Our Platform, ${fullname}!</h2>
      <p>We're excited to have you on board.</p>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Thank you,<br/>The Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export default sendWelcomeEmail;
