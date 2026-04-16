import { SignJWT, jwtVerify } from 'jose';

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret');

export type JWTPayload = {
  id: string;
  fullName: string;
  isAdmin: boolean;
};

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as JWTPayload;
}
