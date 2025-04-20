// Declare global types for browser APIs
declare global {
  interface Window {
    localStorage: Storage;
    location: Location;
  }
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// API base URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

export const isAuthenticated = (): boolean => {
  if (!isBrowser) return false;
  return !!window.localStorage.getItem('authToken');
};

export const getAuthToken = (): string | null => {
  if (!isBrowser) return null;
  return window.localStorage.getItem('authToken');
};

export const setAuthToken = (token: string): void => {
  if (!isBrowser) return;
  window.localStorage.setItem('authToken', token);
};

export const removeAuthToken = (): void => {
  if (!isBrowser) return;
  window.localStorage.removeItem('authToken');
};

export const redirectToDashboard = (): void => {
  if (!isBrowser) return;
  window.location.href = '/dashboard';
};

export const redirectToLogin = (): void => {
  if (!isBrowser) return;
  window.location.href = '/login';
};

// API functions
export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  });
  return handleResponse(response);
};

export const signup = async (email: string, password: string, passwordConfirmation: string): Promise<{ token: string }> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      user: { 
        email, 
        password,
        password_confirmation: passwordConfirmation 
      } 
    }),
  });
  return handleResponse(response);
};

export const logout = async (): Promise<void> => {
  const token = getAuthToken();
  if (!token) return;

  await fetch(`${API_BASE_URL}/logout`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  removeAuthToken();
};

export const getCurrentUser = async (): Promise<{ email: string }> => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token');

  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}; 