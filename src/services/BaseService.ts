// src/services/BaseService.ts
export abstract class BaseService<T> {
  protected baseUrl: string;
  protected headers: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  protected async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: { ...this.headers, ...options.headers },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  }

  abstract getAll(): Promise<T[]>;
  abstract getById(id: string): Promise<T>;
  abstract create(item: Partial<T>): Promise<T>;
  abstract update(id: string, item: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}