import mongoose, { Schema } from "mongoose";

const CounterSchema = new mongoose.Schema({
  sequenceName: {
    type: Number,
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
    type: Number,
    unique: true,
  },
  Profilename: {
    type: String,
    trim: true,
    default: null,
  },
  gender: {
    type: String,
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
  matchrequest: {
    type: [Number],
    default: [],
  },
  matched: {
    type: Array,
    default: [],
  },
  matchnotification: {
    type: Boolean,
    default: false,
  },
  socials: {
    type: Array,
    default: [],
  },
  profilephotosrc: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
  },
  keywords: {
    type: Array,
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to sort `matchrequest` array in ascending order
UserSchema.pre("save", function (next) {
  if (this.matchrequest && this.matchrequest.length > 0) {
    this.matchrequest.sort((a, b) => a - b);
  }
  next();
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

      this.userid = counter.sequenceValue;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
