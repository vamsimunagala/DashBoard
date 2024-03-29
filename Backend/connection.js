const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load the environment variables from .env file
dotenv.config();

const mongoUrl = `mongodb+srv://sameertalagadadeevi1778:sameer1305@cluster0.suggpqy.mongodb.net/DashBoard?retryWrites=true&w=majority&appName=Cluster0`;

// Set up MongoDB connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit process on connection error
});

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Gracefully handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = mongoose