// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // For JSON responses, use the message from the response
      const errorMessage = (data && typeof data === 'object' && data.message) 
        ? data.message 
        : `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  logout: async () => {
    return apiCall('/users/logout', {
      method: 'POST',
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/users/current-user', {
      method: 'GET',
    });
  },
  

  // Refresh access token
  refreshToken: async () => {
    return apiCall('/users/refresh-token', {
      method: 'POST',
    });
  },
};

// Memory API calls (for future use)
export const memoryAPI = {
  // Get all memories
  getMemories: async () => {
    return apiCall('/memories');
  },

  // Create new memory
  createMemory: async (memoryData) => {
    return apiCall('/memories', {
      method: 'POST',
      body: JSON.stringify(memoryData),
    });
  },

  // Update memory
  updateMemory: async (id, memoryData) => {
    return apiCall(`/memories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(memoryData),
    });
  },

  // Delete memory
  deleteMemory: async (id) => {
    return apiCall(`/memories/${id}`, {
      method: 'DELETE',
    });
  },
};

export default apiCall;
