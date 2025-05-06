import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  login,
  signup,
  logout,
  getCurrentUser,
} from './auth';

describe('Auth Utility', () => {
  const mockToken = 'test-token';
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockPasswordConfirmation = 'password123';

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Token Management', () => {
    it('should set auth token', () => {
      setAuthToken(mockToken);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('authToken', mockToken);
    });

    it('should get auth token', () => {
      (window.localStorage.getItem as any).mockReturnValue(mockToken);
      expect(getAuthToken()).toBe(mockToken);
    });

    it('should remove auth token', () => {
      removeAuthToken();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('authToken');
    });

    it('should check if user is authenticated', () => {
      (window.localStorage.getItem as any).mockReturnValue(mockToken);
      expect(isAuthenticated()).toBe(true);

      (window.localStorage.getItem as any).mockReturnValue(null);
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('API Functions', () => {
    it('should handle login successfully', async () => {
      const mockResponse = { token: mockToken };
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await login(mockEmail, mockPassword);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/login',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { email: mockEmail, password: mockPassword } }),
        })
      );
    });

    it('should handle signup successfully', async () => {
      const mockResponse = { token: mockToken };
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await signup(mockEmail, mockPassword, mockPasswordConfirmation);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/signup',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: {
              email: mockEmail,
              password: mockPassword,
              password_confirmation: mockPasswordConfirmation,
            },
          }),
        })
      );
    });

    it('should handle logout successfully', async () => {
      (window.localStorage.getItem as any).mockReturnValue(mockToken);
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      await logout();
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/logout',
        expect.objectContaining({
          method: 'DELETE',
          headers: { Authorization: `Bearer ${mockToken}` },
        })
      );
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('authToken');
    });

    it('should handle getCurrentUser successfully', async () => {
      const mockUser = { email: mockEmail };
      (window.localStorage.getItem as any).mockReturnValue(mockToken);
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

      const result = await getCurrentUser();
      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/me',
        expect.objectContaining({
          headers: { Authorization: `Bearer ${mockToken}` },
        })
      );
    });

    it('should handle API errors', async () => {
      const mockError = { message: 'Invalid credentials' };
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockError),
      });

      await expect(login(mockEmail, mockPassword)).rejects.toThrow('Invalid credentials');
    });
  });
}); 