import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signed session cookie: base64url(payload) + "." + HMAC-SHA256 signature.
 * The signature proves the cookie wasn't tampered with client-side; it is
 * not encryption, so don't put secrets in the payload (name/email only).
 *
 * Set a real AUTH_SECRET env var in production. The fallback below is
 * fine for local dev / this demo, but means anyone with the repo could
 * forge a cookie for this specific deployment if it's ever left unset.
 */
const SECRET = process.env.AUTH_SECRET || "dev-only-insecure-secret-change-me";

export const SESSION_COOKIE_NAME = "amazon_clone_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  name: string;
  email: string;
}

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionCookieValue(payload: SessionPayload): string {
  const base = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${base}.${sign(base)}`;
}

export function verifySessionCookieValue(
  value: string | undefined
): SessionPayload | null {
  if (!value) return null;
  const [base, signature] = value.split(".");
  if (!base || !signature) return null;

  const expected = sign(base);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(actualBuf, expectedBuf)) return null;

  try {
    const payload = JSON.parse(Buffer.from(base, "base64url").toString("utf8"));
    if (typeof payload?.name === "string" && typeof payload?.email === "string") {
      return payload as SessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}
