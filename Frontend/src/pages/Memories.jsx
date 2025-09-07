import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Star, 
  List, 
  Grid, 
  Download, 
  Edit, 
  Share2, 
  Trash2, 
  ExternalLink,
  Filter,
  Calendar,
  Heart,
  MapPin,
  Clock,
  Eye,
  X,
  BookOpen,
  Camera,
  Mic,
  Video,
  Mail,
  PenTool
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import sampleMemories from "../data/sampleMemories.json";

// Helper functions
const getMemories = () => {
  try {
    const local = localStorage.getItem("memories");
    return local ? JSON.parse(local) : sampleMemories;
  } catch (error) {
    console.error("Error loading memories from localStorage:", error);
    return sampleMemories;
  }
};

const saveMemories = (memories) => {
  try {
    localStorage.setItem("memories", JSON.stringify(memories));
  } catch (error) {
    console.error("Error saving memories to localStorage:", error);
  }
};

const sortMemories = (memories, sortBy) => {
  const sorted = [...memories];
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "oldest":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "favorites":
      return sorted.filter((m) => m.favorite);
    case "alphabetical":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

const filterMemories = (memories, search, selectedTags) => {
  return memories.filter((memory) => {
    const matchesSearch = 
      memory.title.toLowerCase().includes(search.toLowerCase()) ||
      memory.description.toLowerCase().includes(search.toLowerCase()) ||
      memory.location?.toLowerCase().includes(search.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every((tag) => memory.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
};

const getAllTags = (memories) => {
  const allTags = memories.flatMap((memory) => memory.tags);
  return [...new Set(allTags)].sort();
};

const getTypeIcon = (type) => {
  const iconProps = { size: 16, className: "text-gray-500" };
  switch (type) {
    case "diary": return <BookOpen {...iconProps} />;
    case "image": return <Camera {...iconProps} />;
    case "voice": return <Mic {...iconProps} />;
    case "video": return <Video {...iconProps} />;
    case "letters": return <Mail {...iconProps} />;
    case "journal": return <PenTool {...iconProps} />;
    default: return <BookOpen {...iconProps} />;
  }
};

function Memories() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showCount, setShowCount] = useState(6);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize data
  useEffect(() => {
    const loadedMemories = getMemories();
    setMemories(loadedMemories);
    setIsLoading(false);
  }, []);

  // Filter and sort memories
  useEffect(() => {
    const filtered = filterMemories(memories, search, selectedTags);
    const sorted = sortMemories(filtered, sortBy);
    setFilteredMemories(sorted);
  }, [memories, search, selectedTags, sortBy]);

  // Save to localStorage when memories change
  useEffect(() => {
    if (memories.length > 0) {
      saveMemories(memories);
    }
  }, [memories]);

  // Export functions
  const exportMemory = (memory) => {
    const dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(memory, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${memory.title.replace(/[^a-z0-9]/gi, '_')}.json`);
    downloadAnchor.click();
  };

  const exportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(memories, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "all_memories.json");
    downloadAnchor.click();
  };

  // Memory actions
  const toggleFavorite = (id) => {
    setMemories((prevMemories) =>
      prevMemories.map((memory) =>
        memory.id === id ? { ...memory, favorite: !memory.favorite } : memory
      )
    );
  };

  const deleteMemory = (id) => {
    if (window.confirm("Are you sure you want to delete this memory? This action cannot be undone.")) {
      setMemories((prevMemories) => prevMemories.filter((memory) => memory.id !== id));
      setSelectedMemory(null);
    }
  };

  const shareMemory = (memory) => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${memory.title}\n${memory.description}\n\nShared from Memory Lane`
      ).then(() => {
        alert("Memory details copied to clipboard!");
      }).catch(() => {
        alert("Unable to share memory. Please try again.");
      });
    }
  };

  // Tag toggle
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setSortBy("newest");
  };

  const allTags = getAllTags(memories);
  const displayedMemories = filteredMemories.slice(0, showCount);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-16 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Memories</h1>
            <p className="text-gray-600">
              {filteredMemories.length} {filteredMemories.length === 1 ? 'memory' : 'memories'} found
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg"
              onClick={() => navigate('/Home')}
            >
              <Plus size={18} />
              Add Memory
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
              onClick={exportAll}
            >
              <Download size={18} />
              Export All
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search memories by title, description, or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort Dropdown */}
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="favorites">Favorites Only</option>
              <option value="alphabetical">A-Z</option>
            </select>

            {/* Filter Toggle */}
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 ml-auto">
              <button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Tag Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Filter by tags:</h3>
                  {(selectedTags.length > 0 || search) && (
                    <button
                      className="text-xs text-blue-500 hover:text-blue-700"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700 border-blue-300'
                          : 'bg-gray-100 text-gray-600 border-gray-300'
                      } border`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Memories Grid/List */}
        <AnimatePresence>
          {displayedMemories.length > 0 ? (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {displayedMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer relative group ${
                    viewMode === 'list' ? 'flex items-center p-4' : 'flex flex-col'
                  }`}
                  onClick={() => setSelectedMemory(memory)}
                >
                  {/* Favorite Button */}
                  <button
                    className={`absolute ${viewMode === 'list' ? 'top-2 right-2' : 'top-3 right-3'} z-10 p-2 rounded-full transition-colors ${
                      memory.favorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'
                    } opacity-0 group-hover:opacity-100`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(memory.id);
                    }}
                    title={memory.favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star size={16} fill={memory.favorite ? "currentColor" : "none"} />
                  </button>

                  {/* Image */}
                  {memory.image && (
                    <div className={viewMode === 'list' ? 'w-16 h-16 mr-4' : 'h-48 w-full'}>
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-4 flex-1 ${viewMode === 'list' ? 'p-0' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{memory.title}</h3>
                      <div className="flex items-center gap-1 ml-2">
                        {getTypeIcon(memory.type)}
                      </div>
                    </div>
                    
                    <p className={`text-gray-600 text-sm mb-3 ${viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-3'}`}>
                      {memory.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(memory.date).toLocaleDateString()}
                      </div>
                      {memory.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {memory.location}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {memory.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {memory.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
                          +{memory.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-gray-500"
            >
              <ExternalLink size={64} className="mb-4" />
              <h3 className="text-xl font-medium mb-2">No memories found</h3>
              <p className="text-center mb-6 max-w-md">
                {search || selectedTags.length > 0
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Start creating your first memory to see it here!"}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                onClick={() => navigate('/Home')}
              >
                <Plus size={18} />
                Add Your First Memory
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {filteredMemories.length > showCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <button
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 font-medium"
              onClick={() => setShowCount(prev => prev + 6)}
            >
              <Eye size={18} />
              Load More ({filteredMemories.length - showCount} remaining)
            </button>
          </motion.div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(selectedMemory.type)}
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMemory.title}</h2>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => setSelectedMemory(null)}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Image */}
                  {selectedMemory.image && (
                    <div className="mb-6">
                      <img
                        src={selectedMemory.image}
                        alt={selectedMemory.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{new Date(selectedMemory.date).toLocaleDateString()}</span>
                    </div>
                    {selectedMemory.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{selectedMemory.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {selectedMemory.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedMemory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      onClick={() => {
                        // TODO: Implement edit functionality
                        alert("Edit feature coming soon! This will open an edit form for the memory.");
                      }}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedMemory.favorite
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleFavorite(selectedMemory.id)}
                    >
                      <Star size={16} fill={selectedMemory.favorite ? "currentColor" : "none"} />
                      {selectedMemory.favorite ? 'Unfavorite' : 'Favorite'}
                    </button>
                    
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      onClick={() => shareMemory(selectedMemory)}
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                    
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                      onClick={() => exportMemory(selectedMemory)}
                    >
                      <Download size={16} />
                      Export
                    </button>
                    
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      onClick={() => deleteMemory(selectedMemory.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Ideas Aside */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart size={20} className="text-red-500" />
            Future Feature Ideas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Clock size={14} />
                Timeline view for chronological browsing
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                Interactive map view by location
              </li>
              <li className="flex items-center gap-2">
                <Camera size={14} />
                Multiple photo attachments per memory
              </li>
              <li className="flex items-center gap-2">
                <Calendar size={14} />
                Reminder system for important dates
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Eye size={14} />
                Advanced search with AI-powered suggestions
              </li>
              <li className="flex items-center gap-2">
                <Share2 size={14} />
                Collaborative memories with friends
              </li>
              <li className="flex items-center gap-2">
                <Download size={14} />
                Backup & sync across devices
              </li>
              <li className="flex items-center gap-2">
                <Heart size={14} />
                Memory mood tracking & analytics
              </li>
            </ul>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>TODO for developers:</strong> These features can be gradually implemented as the app grows. 
              The current localStorage-based data can easily be migrated to a backend API when ready.
            </p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

export default Memories;
