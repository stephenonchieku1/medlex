import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './dashboard.astro';

// Mock the auth utility functions
vi.mock('../utils/auth', () => ({
  getAuthToken: vi.fn(),
  removeAuthToken: vi.fn(),
  redirectToLogin: vi.fn(),
  getCurrentUser: vi.fn(),
  logout: vi.fn(),
}));

describe('Dashboard Page', () => {
  const mockToken = 'test-token';
  const mockUser = { email: 'test@example.com' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login if no token is present', () => {
    (getAuthToken as any).mockReturnValue(null);
    render(Dashboard);
    expect(redirectToLogin).toHaveBeenCalled();
  });

  it('fetches and displays user data when token is present', async () => {
    (getAuthToken as any).mockReturnValue(mockToken);
    (getCurrentUser as any).mockResolvedValueOnce(mockUser);

    const { getByText } = render(Dashboard);

    await waitFor(() => {
      expect(getByText(`Welcome, ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  it('handles logout correctly', async () => {
    (getAuthToken as any).mockReturnValue(mockToken);
    (getCurrentUser as any).mockResolvedValueOnce(mockUser);

    const { getByText } = render(Dashboard);
    const logoutButton = getByText('Logout');

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(redirectToLogin).toHaveBeenCalled();
    });
  });

  it('handles API errors when fetching user data', async () => {
    (getAuthToken as any).mockReturnValue(mockToken);
    (getCurrentUser as any).mockRejectedValueOnce(new Error('API Error'));

    render(Dashboard);

    await waitFor(() => {
      expect(removeAuthToken).toHaveBeenCalled();
      expect(redirectToLogin).toHaveBeenCalled();
    });
  });

  it('handles API errors during logout', async () => {
    (getAuthToken as any).mockReturnValue(mockToken);
    (getCurrentUser as any).mockResolvedValueOnce(mockUser);
    (logout as any).mockRejectedValueOnce(new Error('Logout failed'));

    const { getByText } = render(Dashboard);
    const logoutButton = getByText('Logout');

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(redirectToLogin).toHaveBeenCalled();
    });
  });
}); 