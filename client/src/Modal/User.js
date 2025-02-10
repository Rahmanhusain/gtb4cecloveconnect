import mongoose, { Schema } from "mongoose";

const CounterSchema = new mongoose.Schema({
  sequenceName: {
    type: String,
    required: true,
    unique: true,
  },
  sequenceValue: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    unique: true,
  },
  Profilename: {
    type: String,
    trim: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  profilephotosrc: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to assign unique `userid` if not present
UserSchema.pre("save", async function (next) {
  if (!this.userid) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "userId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );

      this.userid = `th-${String(counter.sequenceValue).padStart(3, "0")}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
