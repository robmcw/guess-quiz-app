import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.email) {
      return res.status(400).json({ message: "Bad request" })
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "New Pie Subscriber!",
        text: data.email,
      })
      console.log("Email sent")
      return res.status(200).json({ success: true })


    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }

  }
  console.log(req.body)
  return res.status(400).json({ message: "Bad request" })
}

export default handler;