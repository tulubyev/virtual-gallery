// src/test/middleware/security.test.ts
import { Request, Response, NextFunction } from 'express';
import { xssProtection, sanitizeInput, csrfProtection } from '../../middleware/security';

function mockRes() {
  const headers: Record<string, string> = {};
  const res: Partial<Response> = {
    locals: {},
  };
  res.setHeader = jest.fn((name: string, value: string) => {
    headers[name] = value;
    return res as Response;
  });
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  (res as any)._headers = headers;
  return res as Response;
}

function mockNext(): NextFunction {
  return jest.fn();
}

// ─── xssProtection ────────────────────────────────────────────────────────────

describe('xssProtection', () => {
  it('sets X-XSS-Protection header', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = mockNext();

    xssProtection(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
  });

  it('sets X-Content-Type-Options header', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = mockNext();

    xssProtection(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
  });

  it('sets X-Frame-Options header', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = mockNext();

    xssProtection(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
  });

  it('sets Strict-Transport-Security header', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = mockNext();

    xssProtection(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  });

  it('calls next()', () => {
    const next = mockNext();
    xssProtection({} as Request, mockRes(), next);
    expect(next).toHaveBeenCalled();
  });
});

// ─── sanitizeInput ────────────────────────────────────────────────────────────

describe('sanitizeInput', () => {
  it('removes <script> tags from body strings', () => {
    const req = {
      body: { comment: 'Hello <script>alert("xss")</script> World' },
    } as Request;
    const next = mockNext();

    sanitizeInput(req, mockRes(), next);

    expect(req.body.comment).not.toMatch(/<script/i);
    expect(req.body.comment).toContain('Hello');
    expect(req.body.comment).toContain('World');
  });

  it('removes javascript: protocol strings', () => {
    const req = {
      body: { url: 'javascript:alert(1)' },
    } as Request;
    const next = mockNext();

    sanitizeInput(req, mockRes(), next);

    expect(req.body.url).not.toMatch(/javascript:/i);
  });

  it('removes inline event handlers like onclick="..."', () => {
    const req = {
      body: { html: '<a onclick="evil()">click</a>' },
    } as Request;
    const next = mockNext();

    sanitizeInput(req, mockRes(), next);

    expect(req.body.html).not.toMatch(/onclick=/i);
  });

  it('leaves safe body fields untouched', () => {
    const req = {
      body: { title: 'Normal title', count: 5 },
    } as Request;
    const next = mockNext();

    sanitizeInput(req, mockRes(), next);

    expect(req.body.title).toBe('Normal title');
    expect(req.body.count).toBe(5);
  });

  it('calls next() after sanitizing', () => {
    const req = { body: { x: 'safe' } } as Request;
    const next = mockNext();

    sanitizeInput(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('does nothing when req.body is absent', () => {
    const req = {} as Request;
    const next = mockNext();

    expect(() => sanitizeInput(req, mockRes(), next)).not.toThrow();
    expect(next).toHaveBeenCalled();
  });
});

// ─── csrfProtection ───────────────────────────────────────────────────────────

describe('csrfProtection', () => {
  it('skips CSRF check for GET requests', () => {
    const req = {
      method: 'GET',
      originalUrl: '/api/artworks',
      headers: {},
      body: {},
    } as Request;
    const next = mockNext();

    csrfProtection(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('skips CSRF check for POST /api/auth/login', () => {
    const req = {
      method: 'POST',
      originalUrl: '/api/auth/login',
      headers: {},
      body: {},
    } as Request;
    const next = mockNext();

    csrfProtection(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('skips CSRF check for POST /api/auth/register', () => {
    const req = {
      method: 'POST',
      originalUrl: '/api/auth/register',
      headers: {},
      body: {},
    } as Request;
    const next = mockNext();

    csrfProtection(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('returns 403 when CSRF token is missing on a POST request', () => {
    const req = {
      method: 'POST',
      originalUrl: '/api/artworks',
      headers: {},
      body: {},
    } as Request;
    const res = mockRes();
    const next = mockNext();

    csrfProtection(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'CSRF token required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() when CSRF token is present in x-csrf-token header', () => {
    const req = {
      method: 'POST',
      originalUrl: '/api/artworks',
      headers: { 'x-csrf-token': 'some-csrf-token' },
      body: {},
    } as unknown as Request;
    const next = mockNext();

    csrfProtection(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('calls next() when CSRF token is present in request body', () => {
    const req = {
      method: 'DELETE',
      originalUrl: '/api/artworks/5',
      headers: {},
      body: { _csrf: 'some-csrf-token' },
    } as Request;
    const next = mockNext();

    csrfProtection(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });
});
