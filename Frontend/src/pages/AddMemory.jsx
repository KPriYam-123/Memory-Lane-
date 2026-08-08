import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, X, Plus, Loader2, CheckCircle } from "lucide-react";
import { memoryAPI } from "../utils/api.js";

const TYPES = ["Diary", "Blog", "Journal", "Letter", "Photo", "Video", "Audio"];

function AddMemory() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "", description: "", type: "Diary", content: "",
        location: "", date: new Date().toISOString().split("T")[0], tags: []
    });
    const [tagInput, setTagInput] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const isMedia = ["Photo", "Video", "Audio"].includes(form.type);
    const isText  = ["Diary", "Blog", "Journal", "Letter"].includes(form.type);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === "type") {
            setFile(null);
            setPreview(null);
        }
    };

    const handleFile = e => {
        const f = e.target.files[0];
        if (!f) return;
        setFile(f);
        if (f.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(f));
        } else {
            setPreview(null);
        }
    };

    const addTag = () => {
        const tag = tagInput.trim();
        if (tag && !form.tags.includes(tag)) {
            setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        }
        setTagInput("");
    };

    const removeTag = tag => setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

    const handleSubmit = async () => {
        if (!form.title.trim()) return setError("Title is required");
        setError(null);
        setIsSubmitting(true);

        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => {
                fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
            });
            if (file) fd.append("media", file);

            await memoryAPI.create(fd);
            setSuccess(true);
            setTimeout(() => navigate("/memories"), 1500);
        } catch (err) {
            setError(err.message || "Failed to save memory");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Memory saved!</h2>
                <p className="text-gray-500 mt-2">Redirecting to your memories...</p>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Add a Memory</h1>
                    <p className="text-gray-500 mt-1">Preserve something worth keeping</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <div className="flex flex-wrap gap-2">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => handleChange({ target: { name: "type", value: t } })}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${form.type === t ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-300 hover:border-blue-300"}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input name="title" value={form.title} onChange={handleChange}
                               placeholder="Give your memory a title"
                               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange}
                                  placeholder="What makes this memory special?" rows={3}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    </div>

                    {/* Text content for text types */}
                    {isText && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <textarea name="content" value={form.content} onChange={handleChange}
                                      placeholder={`Write your ${form.type.toLowerCase()} here...`} rows={8}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm" />
                        </div>
                    )}

                    {/* File upload for media types */}
                    {isMedia && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {form.type === "Photo" ? "Image" : form.type === "Video" ? "Video" : "Audio"} File
                            </label>
                            {file ? (
                                <div className="relative">
                                    {preview && <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-lg mb-2" />}
                                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                                        <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                        <button onClick={() => { setFile(null); setPreview(null); }} className="text-gray-400 hover:text-red-500 ml-2">
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                                    <Upload size={28} className="text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Click to upload {form.type.toLowerCase()}</span>
                                    <input type="file" className="hidden" onChange={handleFile}
                                           accept={form.type === "Photo" ? "image/*" : form.type === "Video" ? "video/*" : "audio/*"} />
                                </label>
                            )}
                        </div>
                    )}

                    {/* Date & Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange}
                                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input name="location" value={form.location} onChange={handleChange}
                                   placeholder="Where were you?"
                                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex gap-2 mb-3">
                            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                                   onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                                   placeholder="Add a tag and press Enter"
                                   className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            <button onClick={addTag} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600">
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={14} /></button>
                </span>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button onClick={() => navigate(-1)}
                                className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} disabled={isSubmitting}
                                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                            {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : "Save Memory"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default AddMemory;