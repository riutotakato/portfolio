const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Menyediakan file statis dari folder "public"
app.use(express.static("public"));

// Baca data JSON dari body request
app.use(bodyParser.json());

// Endpoint untuk menerima data form dan kirim email
app.post("/send-email", async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "EMAIL_KAMU@gmail.com",         // GANTI email kamu
        pass: "APP_PASSWORD_KAMU"             // GANTI app password Gmail kamu
      }
    });

    await transporter.sendMail({
      from: `"${fullname}" <${email}>`,
      to: "EMAIL_KAMU@gmail.com",            // Email tujuan
      subject: "Pesan dari Website Portofolio",
      text: message
    });

    res.status(200).json({ message: "Pesan berhasil dikirim!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengirim pesan." });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
