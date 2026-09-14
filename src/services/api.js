const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 && !path.endsWith('/login')) {
      window.dispatchEvent(new Event('bd:auth-expired'));
    }
    throw new ApiError(payload?.message || 'The server could not complete this request.', response.status, payload?.details);
  }

  return payload;
};

const jsonRequest = (path, method, body) => request(path, {
  method,
  ...(body !== undefined && { body: JSON.stringify(body) }),
});

const api = {
  auth: {
    login: (credentials) => jsonRequest('/v1/auth/login', 'POST', credentials),
    me: () => request('/v1/auth/me'),
    logout: () => jsonRequest('/v1/auth/logout', 'POST'),
  },
  admin: {
    dashboard: () => request('/v1/admin/dashboard'),
    reports: (status) => request(`/v1/admin/reports?status=${encodeURIComponent(status)}&limit=100`),
    approveReport: (id, reviewNote) => jsonRequest(`/v1/admin/reports/${encodeURIComponent(id)}/approve`, 'PATCH', { reviewNote: reviewNote || null }),
    rejectReport: (id, reviewNote) => jsonRequest(`/v1/admin/reports/${encodeURIComponent(id)}/reject`, 'PATCH', { reviewNote: reviewNote || null }),
    updateReport: (id, data) => jsonRequest(`/v1/admin/reports/${encodeURIComponent(id)}`, 'PATCH', data),
    publishReport: (id, data) => jsonRequest(`/v1/admin/reports/${encodeURIComponent(id)}/publish`, 'POST', data),
    users: () => request('/v1/admin/users?limit=100'),
    auditLogs: () => request('/v1/admin/audit-logs?limit=100'),
    safetyKnowledge: () => request('/v1/admin/safety-knowledge?limit=100'),
    createSafetyKnowledge: (data) => jsonRequest('/v1/admin/safety-knowledge', 'POST', data),
    updateSafetyKnowledge: (id, data) => jsonRequest(`/v1/admin/safety-knowledge/${encodeURIComponent(id)}`, 'PATCH', data),
    publishSafetyKnowledge: (id, isPublished) => jsonRequest(`/v1/admin/safety-knowledge/${encodeURIComponent(id)}/publish`, 'PATCH', { isPublished }),
    deleteSafetyKnowledge: (id) => request(`/v1/admin/safety-knowledge/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  },
};

export { API_BASE_URL, api, request };
