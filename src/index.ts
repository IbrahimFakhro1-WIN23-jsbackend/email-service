import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // replace with your email
      pass: 'your-email-password', // replace with your email password
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    res.send('Email sent: ' + info.response);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Email service listening on port ${port}`);
});
