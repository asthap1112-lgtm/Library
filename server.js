const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");
const user = require('./models/user');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/user",(req ,res) => {
    res.json(user);
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/user", (req, res) => {const{ name,email } = req.body;
console.log("Recevied data:", req.body);
if (!name || !email){
    return res.status(400).json ({message: "All fields are required"});
} 
res.status(201).json({message: "User added successfully", user:{name,email}
});
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));