const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express(); // <-- this creates app
const PORT = process.env.PORT ||5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/registrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define schema
const registrationSchema = new mongoose.Schema({
  name: String,
  branch: String,
  gender: String,
  city: String,
});

// Create model
const Registration = mongoose.model("Registration", registrationSchema);


// Example test route
app.get("/api/message", (req, res) => {
  res.json({ text: "Hello from backend!" });
});



app.post("/api/register", async(req, res) => {
  const { name, branch, gender, city } = req.body;

  try {
    const newRegistration = new Registration({ name, branch, gender, city });
    await newRegistration.save();

    console.log("sae to DB :", req.body);

    res.json({
      message: `Registration successful for ${name} (${branch}, ${gender}, ${city})`,
    });
  } catch (error) {
    console.log("error saving to DB:", error);
    res.status(500).json({ message: "error saving data" });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
