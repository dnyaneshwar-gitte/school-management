const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 📌 Define School Schema
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const School = mongoose.model("School", schoolSchema);

// 📌 Add School API (POST /addSchool)
router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSchool = new School({ name, address, latitude, longitude });
    await newSchool.save();
    res.status(201).json({ message: "School added successfully", school: newSchool });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 List Schools API (GET /listSchools)
router.get("/listSchools", async (req, res) => {
  try {
    const { name, latitude, longitude } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    let schools = await School.find(query);

    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);

      const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (deg) => (deg * Math.PI) / 180;
        const R = 6371; // Radius of Earth in KM
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      };

      schools = schools.map((school) => ({
        ...school.toObject(),
        distance: haversineDistance(userLat, userLng, school.latitude, school.longitude),
      }));

      schools.sort((a, b) => a.distance - b.distance);
    }

    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Get a Single School by ID (GET /school/:id)
router.get("/school/:id", async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Delete a School by ID (DELETE /school/:id)
router.delete("/school/:id", async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
