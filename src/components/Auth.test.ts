import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Auth from './Auth.astro';

// Mock the auth utility functions
vi.mock('../utils/auth', () => ({
  setAuthToken: vi.fn(),
  redirectToDashboard: vi.fn(),
  login: vi.fn(),
  signup: vi.fn(),
}));

describe('Auth Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form by default', () => {
    const { getByPlaceholderText, getByText } = render(Auth, {
      props: { client: { load: true } },
    });

    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
    expect(getByText("Don't have an account? Sign up")).toBeInTheDocument();
  });

  it('toggles between login and signup forms', async () => {
    const { getByText, getByPlaceholderText } = render(Auth, {
      props: { client: { load: true } },
    });

    // Click toggle button
    fireEvent.click(getByText("Don't have an account? Sign up"));

    // Check if form switched to signup
    expect(getByText('Sign up')).toBeInTheDocument();
    expect(getByText('Already have an account? Sign in')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();

    // Click toggle button again
    fireEvent.click(getByText('Already have an account? Sign in'));

    // Check if form switched back to login
    expect(getByText('Sign in')).toBeInTheDocument();
    expect(getByText("Don't have an account? Sign up")).toBeInTheDocument();
  });

  it('handles login submission', async () => {
    const { getByPlaceholderText, getByText } = render(Auth, {
      props: { client: { load: true } },
    });

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign in');

    // Fill in form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Check if login was called with correct data
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles signup submission', async () => {
    const { getByPlaceholderText, getByText } = render(Auth, {
      props: { client: { load: true } },
    });

    // Switch to signup form
    fireEvent.click(getByText("Don't have an account? Sign up"));

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const submitButton = getByText('Sign up');

    // Fill in form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Check if signup was called with correct data
    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        'password123'
      );
    });
  });

  it('shows error message when passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(Auth, {
      props: { client: { load: true } },
    });

    // Switch to signup form
    fireEvent.click(getByText("Don't have an account? Sign up"));

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const submitButton = getByText('Sign up');

    // Fill in form with mismatched passwords
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });

    // Submit form
    fireEvent.click(submitButton);

    // Check if error message is shown
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('shows error message on API error', async () => {
    const { getByPlaceholderText, getByText } = render(Auth, {
      props: { client: { load: true } },
    });

    // Mock API error
    (login as any).mockRejectedValueOnce(new Error('Invalid credentials'));

    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign in');

    // Fill in form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });

    // Submit form
    fireEvent.click(submitButton);

    // Check if error message is shown
    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
}); 