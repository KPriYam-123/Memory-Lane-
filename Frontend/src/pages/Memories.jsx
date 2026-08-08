import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Star, List, Grid, Download, Edit,
  Share2, Trash2, Filter, Calendar, MapPin, X,
  BookOpen, Camera, Mic, Video, Mail, PenTool, Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memoryAPI } from "../utils/api.js";

const TYPE_ICONS = {
  Diary:   <BookOpen size={16} className="text-gray-500" />,
  Photo:   <Camera   size={16} className="text-gray-500" />,
  Audio:   <Mic      size={16} className="text-gray-500" />,
  Video:   <Video    size={16} className="text-gray-500" />,
  Letter:  <Mail     size={16} className="text-gray-500" />,
  Journal: <PenTool  size={16} className="text-gray-500" />,
  Blog:    <BookOpen size={16} className="text-gray-500" />,
};

function Memories() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [typeFilter, setTypeFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  const fetchMemories = useCallback(async (pageNum = 1, append = false) => {
    try {
      append ? setIsLoadingMore(true) : setIsLoading(true);
      setError(null);

      const params = { page: pageNum, limit: 12, sortBy };
      if (search) params.search = search;
      if (typeFilter) params.type = typeFilter;

      const res = await memoryAPI.getAll(params);
      const docs = res.data?.docs || [];

      setMemories(prev => append ? [...prev, ...docs] : docs);
      setPagination(res.data || {});
      setPage(pageNum);
    } catch (err) {
      setError(err.message || "Failed to load memories");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [search, sortBy, typeFilter]);

  useEffect(() => {
    const t = setTimeout(() => fetchMemories(1), search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchMemories, search]);

  const handleToggleFavorite = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await memoryAPI.toggleFavorite(id);
      const updated = res.data;
      setMemories(prev => prev.map(m => m._id === id ? updated : m));
      if (selectedMemory?._id === id) setSelectedMemory(updated);
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this memory? This cannot be undone.")) return;
    try {
      await memoryAPI.delete(id);
      setMemories(prev => prev.filter(m => m._id !== id));
      setSelectedMemory(null);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const handleShare = (memory) => {
    if (navigator.share) {
      navigator.share({ title: memory.title, text: memory.description });
    } else {
      navigator.clipboard.writeText(`${memory.title}\n${memory.description}\n\nShared from Memory Lane`);
    }
  };

  const handleExport = (memory) => {
    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memory, null, 2));
    a.download = `${memory.title.replace(/[^a-z0-9]/gi, "_")}.json`;
    a.click();
  };

  const TYPES = ["Photo", "Video", "Audio", "Diary", "Letter", "Blog", "Journal"];

  if (isLoading) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Your Memories</h1>
              <p className="text-gray-500 text-sm">{pagination.totalDocs ?? memories.length} memories</p>
            </div>
            <button onClick={() => navigate("/Home")}
                    className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow" onClick={() => navigate("/add-memory")}>
              <Plus size={18} /> Add Memory
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search by title, description, location..."
                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                     value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      value={sortBy} onChange={e => { setSortBy(e.target.value); fetchMemories(1); }}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">A–Z</option>
              </select>

              <button onClick={() => setShowFilters(v => !v)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${showFilters ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                <Filter size={16} /> Filters
              </button>

              <div className="flex bg-gray-100 rounded-lg p-1 ml-auto">
                <button className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : ""}`} onClick={() => setViewMode("grid")}><Grid size={16} /></button>
                <button className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow" : ""}`} onClick={() => setViewMode("list")}><List size={16} /></button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Filter by type:</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => { setTypeFilter(""); fetchMemories(1); }}
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${!typeFilter ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-100 text-gray-600 border-gray-300"}`}>
                        All
                      </button>
                      {TYPES.map(t => (
                          <button key={t} onClick={() => { setTypeFilter(t); fetchMemories(1); }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border ${typeFilter === t ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-100 text-gray-600 border-gray-300"}`}>
                            {t}
                          </button>
                      ))}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
          )}

          {memories.length > 0 ? (
              <>
                <div className={viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"}>
                  {memories.map(memory => (
                      <motion.div key={memory._id} layout
                                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                                  className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer relative group ${viewMode === "list" ? "flex items-center p-4" : "flex flex-col"}`}
                                  onClick={() => setSelectedMemory(memory)}>

                        <button onClick={e => handleToggleFavorite(memory._id, e)}
                                className={`absolute ${viewMode === "list" ? "top-2 right-2" : "top-3 right-3"} z-10 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 ${memory.favorite ? "bg-yellow-100 text-yellow-500" : "bg-gray-100 text-gray-400"}`}>
                          <Star size={16} fill={memory.favorite ? "currentColor" : "none"} />
                        </button>

                        {memory.mediaUrl && (
                            <div className={viewMode === "list" ? "w-16 h-16 mr-4 shrink-0" : "h-48 w-full"}>
                              {memory.type === "Video" ? (
                                  <video src={memory.mediaUrl} className="w-full h-full object-cover" />
                              ) : (
                                  <img src={memory.mediaUrl} alt={memory.title} className="w-full h-full object-cover" />
                              )}
                            </div>
                        )}

                        <div className="p-4 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 line-clamp-1">{memory.title}</h3>
                            {TYPE_ICONS[memory.type]}
                          </div>
                          <p className={`text-gray-600 text-sm mb-3 ${viewMode === "list" ? "line-clamp-1" : "line-clamp-3"}`}>
                            {memory.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1"><Calendar size={12} />{new Date(memory.date).toLocaleDateString()}</span>
                            {memory.location && <span className="flex items-center gap-1"><MapPin size={12} />{memory.location}</span>}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {memory.tags?.slice(0, 3).map(tag => (
                                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">{tag}</span>
                            ))}
                            {memory.tags?.length > 3 && (
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">+{memory.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </div>

                {pagination.hasNextPage && (
                    <div className="flex justify-center mt-8">
                      <button onClick={() => fetchMemories(page + 1, true)} disabled={isLoadingMore}
                              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg shadow border border-gray-200 flex items-center gap-2 font-medium disabled:opacity-50">
                        {isLoadingMore ? <Loader2 size={18} className="animate-spin" /> : "Load More"}
                      </button>
                    </div>
                )}
              </>
          ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Camera size={64} className="mb-4 opacity-30" />
                <h3 className="text-xl font-medium mb-2">No memories yet</h3>
                <p className="text-center mb-6 max-w-md text-sm">
                  {search || typeFilter ? "Try adjusting your filters." : "Start creating your first memory!"}
                </p>
                <button onClick={() => navigate("/add-memory")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={18} /> Add Your First Memory
                </button>
              </motion.div>
          )}

          <AnimatePresence>
            {selectedMemory && (
                <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedMemory(null)}>
                  <motion.div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                              onClick={e => e.stopPropagation()}>

                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {TYPE_ICONS[selectedMemory.type]}
                        <h2 className="text-xl font-bold text-gray-800">{selectedMemory.title}</h2>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSelectedMemory(null)}>
                        <X size={20} />
                      </button>
                    </div>

                    <div className="p-6">
                      {selectedMemory.mediaUrl && (
                          <div className="mb-6">
                            {selectedMemory.type === "Video" ? (
                                <video src={selectedMemory.mediaUrl} controls className="w-full rounded-lg" />
                            ) : selectedMemory.type === "Audio" ? (
                                <audio src={selectedMemory.mediaUrl} controls className="w-full" />
                            ) : (
                                <img src={selectedMemory.mediaUrl} alt={selectedMemory.title} className="w-full h-64 object-cover rounded-lg" />
                            )}
                          </div>
                      )}

                      <div className="flex gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={14} />{new Date(selectedMemory.date).toLocaleDateString()}</span>
                        {selectedMemory.location && <span className="flex items-center gap-1"><MapPin size={14} />{selectedMemory.location}</span>}
                      </div>

                      {selectedMemory.content && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-sm whitespace-pre-wrap">
                            {selectedMemory.content}
                          </div>
                      )}

                      <p className="text-gray-700 mb-4 leading-relaxed">{selectedMemory.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedMemory.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{tag}</span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button onClick={() => handleToggleFavorite(selectedMemory._id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedMemory.favorite ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                          <Star size={16} fill={selectedMemory.favorite ? "currentColor" : "none"} />
                          {selectedMemory.favorite ? "Unfavorite" : "Favorite"}
                        </button>
                        <button onClick={() => handleShare(selectedMemory)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                          <Share2 size={16} /> Share
                        </button>
                        <button onClick={() => handleExport(selectedMemory)}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                          <Download size={16} /> Export
                        </button>
                        <button onClick={() => handleDelete(selectedMemory._id)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
}

export default Memories;