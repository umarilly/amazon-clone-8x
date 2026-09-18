/**
 * Mock user store for the demo auth flow — an in-memory Map, not a real
 * database, per the architecture doc's explicit scope. On Vercel this
 * lives in a single serverless function instance: it survives quick
 * successive requests (a normal sign-up -> sign-in test session) but does
 * NOT persist across a cold start or a new deployment. That's an accepted
 * tradeoff for a mocked, no-backend demo, not an oversight.
 */
export interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
}

const users = new Map<string, StoredUser>();

export function findUser(email: string): StoredUser | undefined {
  return users.get(email.trim().toLowerCase());
}

export function createUser(user: StoredUser): void {
  users.set(user.email.trim().toLowerCase(), user);
}
