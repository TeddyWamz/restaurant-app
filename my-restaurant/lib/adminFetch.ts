// lib/adminFetch.ts
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export class AuthError extends Error {}

// Resolves once Firebase has restored the session
function waitForUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function adminFetch<T = unknown>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  const user = auth.currentUser ?? (await waitForUser());
  if (!user) throw new AuthError("Not signed in");

  const token = await user.getIdToken();

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new AuthError("Session expired");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? "Request failed");
  return data as T;
}