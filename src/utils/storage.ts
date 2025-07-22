export class Localstorage {
  static get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export class SessionStorage {
  static get<T>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }

  static set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
