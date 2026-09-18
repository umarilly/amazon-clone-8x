import { createHash, timingSafeEqual } from "crypto";

/**
 * Mocked password hashing for a demo auth flow — a salted SHA-256 digest,
 * not a real KDF (bcrypt/scrypt/argon2). Fine for "no real verification"
 * mock auth; not something to reuse for an app with real user data.
 */
const SALT = "amazon-clone-8x-demo-salt";

export function hashPassword(password: string): string {
  return createHash("sha256").update(`${SALT}:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const candidate = Buffer.from(hashPassword(password));
  const expected = Buffer.from(hash);
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  );
}
