// Add DNS fix FIRST - before anything else
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const DSAQuestion = require("./models/DSAQuestion");
const dsaQuestions = require("./data/dsaData");

const seed = async () => {
  await connectDB();
  try {
    await DSAQuestion.deleteMany({});
    console.log("🗑️  Cleared existing DSA questions.");

    const inserted = await DSAQuestion.insertMany(dsaQuestions);
    console.log(`✅  Seeded ${inserted.length} DSA problems successfully!`);

    const summary = await DSAQuestion.aggregate([
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    console.log("\n📊 Problems by Topic:");
    summary.forEach((s) => console.log(`   ${s._id}: ${s.count}`));
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
  }
};

seed();