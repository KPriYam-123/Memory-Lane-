import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import Memory from '../models/memory.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const createMemory = asyncHandler(async (req, res) => {
    const { title, description, type, tags, location, date, content } = req.body;

    if (!title?.trim() || !type) {
        throw new ApiError(400, "Title and type are required");
    }

    let mediaUrl = "";
    let mediaPublicId = "";

    if (req.file) {
        const uploaded = await uploadOnCloudinary(req.file.path);
        if (!uploaded) throw new ApiError(500, "Media upload failed");
        mediaUrl = uploaded.secure_url;
        mediaPublicId = uploaded.public_id;
    }

    const memory = await Memory.create({
        user: req.user._id,
        title: title.trim(),
        description: description?.trim() || "",
        type,
        tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
        location: location?.trim() || "",
        date: date ? new Date(date) : new Date(),
        content: content?.trim() || "",
        mediaUrl,
        mediaPublicId
    });

    return res.status(201).json(new ApiResponse(201, "Memory created", memory));
});

const getMemories = asyncHandler(async (req, res) => {
    const { page = 1, limit = 12, type, favorite, search, sortBy = "newest" } = req.query;

    const match = { user: req.user._id };
    if (type) match.type = type;
    if (favorite === "true") match.favorite = true;
    if (search) {
        match.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
        ];
    }

    const sortMap = {
        newest: { date: -1 },
        oldest: { date: 1 },
        alphabetical: { title: 1 }
    };
    const sort = sortMap[sortBy] || { date: -1 };

    const aggregate = Memory.aggregate([
        { $match: match },
        { $sort: sort }
    ]);

    const options = { page: parseInt(page), limit: parseInt(limit) };
    const result = await Memory.aggregatePaginate(aggregate, options);

    return res.status(200).json(new ApiResponse(200, "Memories fetched", result));
});

const getMemoryById = asyncHandler(async (req, res) => {
    const memory = await Memory.findOne({ _id: req.params.id, user: req.user._id });
    if (!memory) throw new ApiError(404, "Memory not found");
    return res.status(200).json(new ApiResponse(200, "Memory fetched", memory));
});

const updateMemory = asyncHandler(async (req, res) => {
    const memory = await Memory.findOne({ _id: req.params.id, user: req.user._id });
    if (!memory) throw new ApiError(404, "Memory not found");

    const { title, description, type, tags, location, date, content, favorite } = req.body;

    if (req.file) {
        if (memory.mediaPublicId) {
            const resourceType = memory.type === "Video" ? "video" : memory.type === "Audio" ? "video" : "image";
            await deleteFromCloudinary(memory.mediaPublicId, resourceType);
        }
        const uploaded = await uploadOnCloudinary(req.file.path);
        if (!uploaded) throw new ApiError(500, "Media upload failed");
        memory.mediaUrl = uploaded.secure_url;
        memory.mediaPublicId = uploaded.public_id;
    }

    if (title !== undefined) memory.title = title.trim();
    if (description !== undefined) memory.description = description.trim();
    if (type !== undefined) memory.type = type;
    if (tags !== undefined) memory.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
    if (location !== undefined) memory.location = location.trim();
    if (date !== undefined) memory.date = new Date(date);
    if (content !== undefined) memory.content = content.trim();
    if (favorite !== undefined) memory.favorite = favorite === "true" || favorite === true;

    await memory.save();
    return res.status(200).json(new ApiResponse(200, "Memory updated", memory));
});

const deleteMemory = asyncHandler(async (req, res) => {
    const memory = await Memory.findOne({ _id: req.params.id, user: req.user._id });
    if (!memory) throw new ApiError(404, "Memory not found");

    if (memory.mediaPublicId) {
        const resourceType = memory.type === "Video" ? "video" : memory.type === "Audio" ? "video" : "image";
        await deleteFromCloudinary(memory.mediaPublicId, resourceType);
    }

    await memory.deleteOne();
    return res.status(200).json(new ApiResponse(200, "Memory deleted", null));
});

const toggleFavorite = asyncHandler(async (req, res) => {
    const memory = await Memory.findOne({ _id: req.params.id, user: req.user._id });
    if (!memory) throw new ApiError(404, "Memory not found");
    memory.favorite = !memory.favorite;
    await memory.save();
    return res.status(200).json(new ApiResponse(200, "Favorite toggled", memory));
});

export { createMemory, getMemories, getMemoryById, updateMemory, deleteMemory, toggleFavorite };