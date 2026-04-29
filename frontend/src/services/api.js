const API_BASE = '/api/v1';

function getToken() {
  return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  // Auth
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  // Dashboard
  getDashboard: () => request('/dashboard/summary'),

  // Audits
  getAudits: () => request('/audits'),
  getAudit: (id) => request(`/audits/${id}`),
  createAudit: (data) => request('/audits', { method: 'POST', body: JSON.stringify(data) }),
  updateAuditStatus: (id, status) => request(`/audits/${id}/status?status=${status}`, { method: 'PATCH' }),
  getAuditResponses: (id) => request(`/audits/${id}/responses`),
  saveAuditResponse: (id, data) => request(`/audits/${id}/responses`, { method: 'POST', body: JSON.stringify(data) }),

  // Templates
  getTemplates: () => request('/templates'),
  getTemplate: (slug) => request(`/templates/${slug}`),

  // Sectors
  getSectors: () => request('/sectors'),
  getSector: (code) => request(`/sectors/${code}`),
  getSectorLaws: (code) => request(`/sectors/${code}/laws`),

  // Deadlines
  getDeadlines: () => request('/deadlines'),

  // Users (admin)
  getUsers: () => request('/users'),
  getUser: (id) => request(`/users/${id}`),
  assignRole: (id, roleName) => request(`/users/${id}/roles`, { method: 'POST', body: JSON.stringify({ roleName }) }),
  removeRole: (id, roleName) => request(`/users/${id}/roles/${roleName}`, { method: 'DELETE' }),

  // Roles (super admin)
  getRoles: () => request('/roles'),
};
