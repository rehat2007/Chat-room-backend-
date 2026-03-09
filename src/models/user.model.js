import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return "Change the password";

    this.password = await bcrypt.hash(this.password, 10)

})



export const User = mongoose.model("User", userSchema)