import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId // Password is required only if not using Google
      },
      minlength: 6,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // This allows multiple null values
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    credits: {
      type: Number,
      default: 10, // New users get 10 free credits
    },
    preferences: {
      theme: {
        type: String,
        enum: ["dark", "light"],
        default: "dark",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    surveyCompleted: {
      type: Boolean,
      default: false,
    },
    surveyData: {
      source: String,
      age: String,
      occupation: String,
      useCase: String,
      additionalInfo: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    paymentHistory: [
      {
        orderId: String,
        amount: Number,
        plan: String,
        creditsAdded: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
