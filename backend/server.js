const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Ensure dotenv is loaded


// Import routes
const cipherRoutes = require("./routes/cipherRoutes");
const emailRoutes = require("./routes/emailRoutes");
const draftRoutes = require("./routes/draftRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reportRoutes = require("./routes/reportRoutes");
const teamRoutes = require("./routes/teamRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend only
    methods: "GET,POST,PUT,DELETE",
    credentials: true // If using cookies or authentication
}));


// Use Routes
app.use("/api/cipher", cipherRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/draft", draftRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Connect to MongoDB using .env variable
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
