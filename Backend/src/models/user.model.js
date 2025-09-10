import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    userId : {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        lowercase : true,    
        trim : true
    },
    fullName : {
        type : String,
        trim : true
    },
    profilePic: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    DOB:{
        type: Date,
        
    },
    communities: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community" }],
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})
userSchema.pre("save", async function(next){
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        userId: this.userId,
        userName: this.userName,
        email: this.email
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_EXPIRY,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export default mongoose.model("User", userSchema);