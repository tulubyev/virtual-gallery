// src/test/middleware/auth.test.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {
  generateToken,
  authenticateToken,
  requireAdmin,
  requireCuratorOrAdmin,
  requireStaffOrHigher,
  requireRole,
  AuthenticatedRequest,
} from '../../middleware/auth';

const TEST_SECRET = 'test_jwt_secret_key_for_unit_tests';

beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

afterEach(() => {
  delete process.env.JWT_SECRET;
});

// Helpers to build minimal mock req/res/next
function mockRes() {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

function mockNext(): NextFunction {
  return jest.fn();
}

// ─── generateToken ────────────────────────────────────────────────────────────

describe('generateToken', () => {
  const baseUser = {
    user_id: 42,
    username: 'alice',
    email: 'alice@example.com',
    role: 'visitor',
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('returns a string', () => {
    expect(typeof generateToken(baseUser)).toBe('string');
  });

  it('encodes userId, email, and role in the payload', () => {
    const token = generateToken(baseUser);
    const decoded = jwt.verify(token, TEST_SECRET) as any;
    expect(decoded.userId).toBe(42);
    expect(decoded.email).toBe('alice@example.com');
    expect(decoded.role).toBe('visitor');
  });

  it('uses the fallback secret when JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;
    const token = generateToken(baseUser);
    expect(() => jwt.verify(token, 'fallback_secret_key')).not.toThrow();
  });
});

// ─── authenticateToken ────────────────────────────────────────────────────────

describe('authenticateToken', () => {
  function makeReqWithToken(token?: string): AuthenticatedRequest {
    return {
      headers: token ? { authorization: `Bearer ${token}` } : {},
    } as AuthenticatedRequest;
  }

  function validToken(overrides: Record<string, any> = {}) {
    return jwt.sign(
      { userId: 1, email: 'test@test.com', role: 'visitor', ...overrides },
      TEST_SECRET,
      { expiresIn: '1h' }
    );
  }

  it('returns 401 when no token is provided', () => {
    const req = makeReqWithToken();
    const res = mockRes();
    const next = mockNext();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when an invalid token is provided', () => {
    const req = makeReqWithToken('this.is.not.valid');
    const res = mockRes();
    const next = mockNext();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 for an expired token', () => {
    const expired = jwt.sign(
      { userId: 1, email: 'x@x.com', role: 'visitor' },
      TEST_SECRET,
      { expiresIn: '-1s' }
    );
    const req = makeReqWithToken(expired);
    const res = mockRes();
    const next = mockNext();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() and populates req.user for a valid token', () => {
    const token = validToken({ userId: 7, email: 'bob@test.com', role: 'admin' });
    const req = makeReqWithToken(token);
    const res = mockRes();
    const next = mockNext();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user!.user_id).toBe(7);
    expect(req.user!.email).toBe('bob@test.com');
    expect(req.user!.role).toBe('admin');
  });

  it('sets is_active to true by default when not in payload', () => {
    const token = validToken();
    const req = makeReqWithToken(token);
    const res = mockRes();
    const next = mockNext();

    authenticateToken(req, res, next);

    expect(req.user!.is_active).toBe(true);
  });
});

// ─── requireAdmin ─────────────────────────────────────────────────────────────

describe('requireAdmin', () => {
  it('returns 401 when req.user is not set', () => {
    const req = {} as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();

    requireAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 for a non-admin user', () => {
    const req = { user: { role: 'visitor' } } as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();

    requireAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() for an admin user', () => {
    const req = { user: { role: 'admin' } } as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();

    requireAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─── requireCuratorOrAdmin ────────────────────────────────────────────────────

describe('requireCuratorOrAdmin', () => {
  it('allows admin through', () => {
    const req = { user: { role: 'admin' } } as AuthenticatedRequest;
    const next = mockNext();
    requireCuratorOrAdmin(req, mockRes(), next);
    expect(next).toHaveBeenCalled();
  });

  it('allows curator through', () => {
    const req = { user: { role: 'curator' } } as AuthenticatedRequest;
    const next = mockNext();
    requireCuratorOrAdmin(req, mockRes(), next);
    expect(next).toHaveBeenCalled();
  });

  it('rejects a visitor', () => {
    const req = { user: { role: 'visitor' } } as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();
    requireCuratorOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

// ─── requireStaffOrHigher ─────────────────────────────────────────────────────

describe('requireStaffOrHigher', () => {
  it.each(['staff', 'curator', 'admin'])('allows role "%s"', (role) => {
    const req = { user: { role } } as AuthenticatedRequest;
    const next = mockNext();
    requireStaffOrHigher(req, mockRes(), next);
    expect(next).toHaveBeenCalled();
  });

  it.each(['visitor', 'guest', 'tour_guide'])('rejects role "%s"', (role) => {
    const req = { user: { role } } as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();
    requireStaffOrHigher(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

// ─── requireRole ──────────────────────────────────────────────────────────────

describe('requireRole', () => {
  it('returns 401 when user is not authenticated', () => {
    const middleware = requireRole(['admin']);
    const req = {} as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('allows access when the user role is in the allowed list', () => {
    const middleware = requireRole(['curator', 'admin']);
    const req = { user: { role: 'curator' } } as AuthenticatedRequest;
    const next = mockNext();

    middleware(req, mockRes(), next);

    expect(next).toHaveBeenCalled();
  });

  it('denies access when the user role is not in the allowed list', () => {
    const middleware = requireRole(['admin']);
    const req = { user: { role: 'visitor' } } as AuthenticatedRequest;
    const res = mockRes();
    const next = mockNext();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('includes the required roles in the error message', () => {
    const middleware = requireRole(['admin', 'curator']);
    const req = { user: { role: 'visitor' } } as AuthenticatedRequest;
    const res = mockRes();
    middleware(req, res, mockNext());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('admin') })
    );
  });
});
