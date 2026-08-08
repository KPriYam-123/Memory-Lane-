import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const memorySchema = new Schema({
    user:        { type: Schema.Types.ObjectId, ref: "User", required: true },
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    type: {
        type: String,
        enum: ["Photo", "Video", "Audio", "Diary", "Letter", "Blog", "Journal"],
        required: true
    },
    tags:     [{ type: String, trim: true }],
    location: { type: String, trim: true },
    date:     { type: Date, default: Date.now },
    favorite: { type: Boolean, default: false },
    mediaUrl:    { type: String, default: "" },
    mediaPublicId: { type: String, default: "" },
    content:  { type: String, default: "" }
}, { timestamps: true });

memorySchema.plugin(mongooseAggregatePaginate);

export default mongoose.model("Memory", memorySchema);