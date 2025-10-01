
import type { User, UserCredentials } from './types';

// This is a simplified in-memory "database" of users.
// In a real application, you would use a proper database.

const USERS_KEY = 'users';
const SESSION_KEY = 'user_session';

const getUsersFromStorage = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (e) {
    console.error("Failed to parse users from localStorage", e);
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch(e) {
    console.error("Failed to save users to localStorage", e);
  }
};

export const signUp = (credentials: UserCredentials): boolean => {
  const users = getUsersFromStorage();
  const existingUser = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

  if (existingUser) {
    return false; // User already exists
  }

  const newUser: User = {
    id: Date.now().toString(),
    ...credentials,
  };

  saveUsersToStorage([...users, newUser]);
  return true;
};

export const authenticate = (email: string, password: string): User | null => {
  const users = getUsersFromStorage();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};


// --- Session Management ---

export const storeUser = (user: User) => {
  if (typeof window === 'undefined') return;
  try {
    const sessionUser = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  } catch (e) {
    console.error("Failed to store user session", e);
  }
};

export const getUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
        const userJson = localStorage.getItem(SESSION_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
        console.error("Failed to get user from session", e);
        return null;
    }
};

export const removeUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
};
