const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const MCQQuestion = require('./models/MCQQuestion');
const mcqData = require('./data/mcqData');

const seed = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✓ MongoDB connected successfully!');

    // Clear existing MCQ data
    await MCQQuestion.deleteMany({});
    console.log('🗑️  Cleared existing MCQ questions.');

    // Insert new MCQ data
    const result = await MCQQuestion.insertMany(mcqData);
    console.log(`✅ Seeded ${result.length} MCQ questions successfully!`);

    // Display summary
    console.log('\n📊 MCQ Distribution by Category:');
    const categories = await MCQQuestion.distinct('category');
    for (const category of categories) {
      const count = await MCQQuestion.countDocuments({ category });
      console.log(`   ${category}: ${count} questions`);
    }

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

seed();