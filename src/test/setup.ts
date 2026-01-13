// src/test/setup.ts
// Setup file for Jest tests

// Mock global objects if needed
global.console = {
  ...console,
  // Suppress console logs in tests unless explicitly needed
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set up any global test utilities
export {};