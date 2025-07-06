const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { email, name } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"Alexis Garage" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'We received your request',
    text: `Hello${name ? ` ${name}` : ''},\n\nThanks for contacting Alexis Garage. We will get back to you soon.`,
  });
  res.status(200).json({ message: 'Auto-reply sent' });
}
 
