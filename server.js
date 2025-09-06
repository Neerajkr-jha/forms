const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express(); // <-- this creates app
const PORT = process.env.PORT ||5000;

// Middleware
app.use(cors({ origin: "*" }));
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
  username: String,
  password:String,
});

// Create model
const Registration = mongoose.model("Registration", registrationSchema);


// Example test route
app.get("/api/message", (req, res) => {
  res.json({ text: "Hello from backend!" });
});



app.post("/api/register", async(req, res) => {
  const { username,password } = req.body;

  try {
    const newRegistration = new Registration({username,password });
    await newRegistration.save();

    console.log("sae to DB :", req.body);

    res.json({
      message: `Registration successful for ${username} (${password})`,
    });
  } catch (error) {
    console.log("error saving to DB:", error);
    res.status(500).json({ message: "error saving data" });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
