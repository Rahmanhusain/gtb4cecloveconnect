import mongoose from 'mongoose';

// Define the schema for storing OTP
const SecretSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email can only have one OTP at a time
  },
  secret: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '120s', // TTL of 20 seconds
  },
});

// Check if the model already exists and use it if available
const Secret = mongoose.models.Secret || mongoose.model('Secret', SecretSchema);

export default Secret;
