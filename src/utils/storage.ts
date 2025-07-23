export class Localstorage {
  static get<T>(key: string): T | null {
    if (!import.meta.env.SSR) {
      return JSON.parse(localStorage.getItem(key) as string);
    }
    return null
  }

  static set<T>(key: string, value: T): void {
    if (!import.meta.env.SSR) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export class SessionStorage {
  static get<T>(key: string): T | null {
    if (!import.meta.env.SSR) {
      return JSON.parse(sessionStorage.getItem(key) as string);
    }
    return null
  }

  static set<T>(key: string, value: T): void {
    if (!import.meta.env.SSR) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
}
