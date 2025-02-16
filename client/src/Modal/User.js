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

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

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
  enrollmentno: {
    type: String,
  },

  matchrequest: {
    type: [Number],
    default: [],
  },
  matched: {
    type: [Number],
    default: [],
  },
  matchnotification: {
    type: Boolean,
    default: false,
  },
  profilephotosrc: {
    type: String,
    default:
      "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages//avatar.png",
  },
  keywords: {
    key1: {
      type: String,
      default: "",
    },
    key2: {
      type: String,
      default: "",
    },
    key3: {
      type: String,
      default: "",
    },
  },
  bio: {
    type: String,
    default: "",
  },
  notififlastindex: {
    type: Number,
    default: 0,
  },
  Instagram: {
    Username: {
      type: String,
      default: "",
    },
    Link: {
      type: String,
      default: "",
    },
  },
  Snapchat: {
    Username: {
      type: String,
      default: "",
    },
    Link: {
      type: String,
      default: "",
    },
  },
  Facebook: {
    Username: {
      type: String,
      default: "",
    },
    Link: {
      type: String,
      default: "",
    },
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
        { sequenceName: "userId" }, // Ensure this is a string
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );

      // Check if counter was updated successfully
      if (counter && counter.sequenceValue) {
        this.userid = counter.sequenceValue;
      } else {
        throw new Error("Failed to generate userId.");
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
