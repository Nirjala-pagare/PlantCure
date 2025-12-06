// Quick MongoDB Connection Test
// Run: node test-mongodb-connection.js

import mongoose from 'mongoose';

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('Connecting to: mongodb://localhost:27017/plantcure');
    
    await mongoose.connect('mongodb://localhost:27017/plantcure', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Check if database has diseases
    const Disease = mongoose.model('Disease', new mongoose.Schema({}, { strict: false }));
    const count = await Disease.countDocuments();
    console.log(`📊 Found ${count} diseases in database`);
    
    if (count === 0) {
      console.log('⚠️  Database is empty. Run: npm run seed');
    }
    
    await mongoose.connection.close();
    console.log('✅ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   - Windows: Check Services (services.msc) for "MongoDB"');
    console.log('   - Or start manually: mongod --dbpath C:\\data\\db');
    process.exit(1);
  }
};

testConnection();

