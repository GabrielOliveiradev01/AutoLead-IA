export const AUTH_STORAGE_KEY = "autolead_demo_user";

export type DemoUser = {
  name: string;
  email: string;
};

export function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function storeUser(user: DemoUser) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
