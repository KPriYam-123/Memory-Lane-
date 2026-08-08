const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    credentials: 'include',
    ...options,
    headers: {
      ...(!options.body || options.body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
      ...options.headers
    }
  };

  const response = await fetch(url, config);
  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    const message = data?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const authAPI = {
  register: (userData) => apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  login: (credentials) => apiCall('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  logout: () => apiCall('/users/logout', { method: 'POST' }),
  getCurrentUser: () => apiCall('/users/current-user'),
  oauthLogin: (userData) => apiCall('/oauth/login', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  refreshToken: () => apiCall('/users/refresh-token', { method: 'POST' })
};

export const memoryAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/memories${query ? `?${query}` : ''}`);
  },
  getById: (id) => apiCall(`/memories/${id}`),
  create: (formData) => apiCall('/memories', { method: 'POST', body: formData }),
  update: (id, formData) => apiCall(`/memories/${id}`, { method: 'PATCH', body: formData }),
  delete: (id) => apiCall(`/memories/${id}`, { method: 'DELETE' }),
  toggleFavorite: (id) => apiCall(`/memories/${id}/favorite`, { method: 'PATCH' })
};

export default apiCall;