const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const InterviewQuestion = require("./models/InterviewQuestion");
const questions = require("./data/questionsData");

const seed = async () => {
  await connectDB();
  try {
    await InterviewQuestion.deleteMany({});
    console.log("🗑️  Cleared existing interview questions.");

    const inserted = await InterviewQuestion.insertMany(questions);
    console.log(`✅  Seeded ${inserted.length} interview questions successfully!`);

    const summary = await InterviewQuestion.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    console.log("\n📊 Questions by Category:");
    summary.forEach((s) => console.log(`   ${s._id}: ${s.count}`));
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
  }
};

seed();