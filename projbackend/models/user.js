const mongoose = require("mongoose");
let crypto;
try {
  crypto = require("node:crypto");
} catch (err) {
  console.error("crypto support is disabled!");
}
const { v4: uuidv4 } = require("uuid");

let userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encrypassword: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function () {
    this._password = this.password;
    this.salt = uuidv4();
    this.encrypassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (plainpass) {
    return this.securePassword(plainpass) === this.encrypassword;
  },
  securePassword: function (plainpass) {
    if (!plainpass) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpass)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
