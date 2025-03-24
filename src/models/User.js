const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "agency"],
      default: "user",
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message:"email is not valid "
      },
    },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    avatar: { type: String, default: "/avatar.png" },
    isBanned: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", Userschema);
module.exports = User;
