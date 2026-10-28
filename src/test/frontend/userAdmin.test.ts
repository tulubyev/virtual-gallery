jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fetchWithAuth } from '../../frontend/src/services/api';
import {
  UserAdminError, createUser, formatDate, handoverText, listUsers, newPasswordProblem, passwordState, resetPassword, resetWarning, roleChangeWarning, setRole,
} from '../../frontend/src/lib/userAdmin';

const mockFetch = fetchWithAuth as jest.Mock;
const reply = (status: number, body: unknown) => mockFetch.mockResolvedValueOnce({ ok: status < 400, status, json: async () => body });
beforeEach(() => mockFetch.mockReset());

const issued: any = { user: { user_id: 7, username: 'Анна', email: 'anna@example.ru', role: 'staff' }, temporary_password: 'Abcd2345Wxyz', expires_at: '2026-11-04T12:00:00Z' };

describe('запросы', () => {
  it('создание: пустой пароль не отправляется, остальное уходит как есть', async () => {
    reply(201, issued);
    await createUser({ username: 'Анна', email: 'anna@example.ru', role: 'staff', password: '   ' });
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('/api/admin/users');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ username: 'Анна', email: 'anna@example.ru', role: 'staff' });
    reply(201, issued);
    await createUser({ username: 'Анна', email: 'anna@example.ru', role: 'staff', password: 'Zadan1234' });
    expect(JSON.parse(mockFetch.mock.calls[1][1].body).password).toBe('Zadan1234');
  });

  it('сброс, смена роли и список идут на нужные адреса', async () => {
    reply(200, issued); await resetPassword(7);
    expect(mockFetch).toHaveBeenLastCalledWith('/api/admin/users/7/reset-password', expect.objectContaining({ method: 'POST' }));
    reply(200, { user: {} }); await setRole(7, 'curator');
    expect(mockFetch).toHaveBeenLastCalledWith('/api/admin/users/7/role', expect.objectContaining({ method: 'PUT', body: '{"role":"curator"}' }));
    reply(200, { users: [], total: 0 }); await listUsers('анна ');
    expect(mockFetch).toHaveBeenLastCalledWith('/api/admin/users?limit=50&search=%D0%B0%D0%BD%D0%BD%D0%B0%20', { method: 'GET' });
  });

  it('ошибки: сообщение сервера для 4xx и 503, общее для остальных 5xx, код сохраняется', async () => {
    reply(409, { error: 'Это последний администратор: сначала назначьте другого', code: 'last_admin' });
    const err = await setRole(1, 'user').catch(e => e);
    expect(err).toBeInstanceOf(UserAdminError);
    expect(err.message).toMatch(/последний администратор/);
    expect(err.code).toBe('last_admin');
    reply(503, { error: 'База не обновлена: примените миграцию 007 (npm run migrate)' });
    await expect(createUser({ username: 'a', email: 'a@b.co', role: 'user' })).rejects.toThrow(/миграцию 007/);
    reply(500, { error: 'ECONNREFUSED 10.0.0.1:5432' });
    await expect(resetPassword(1)).rejects.toThrow('Не удалось выполнить действие.');
    reply(403, { error: 'x' });
    await expect(resetPassword(1)).rejects.toThrow('Недостаточно прав.');
  });
});

describe('состояние временного пароля', () => {
  const now = Date.parse('2026-10-28T12:00:00Z');
  it('нет, ждёт смены, истёк', () => {
    expect(passwordState({ must_change_password: false, temp_password_expires_at: null }, now)).toBe('none');
    expect(passwordState({}, now)).toBe('none');
    expect(passwordState({ must_change_password: true, temp_password_expires_at: '2026-11-01T00:00:00Z' }, now)).toBe('pending');
    expect(passwordState({ must_change_password: true, temp_password_expires_at: '2026-10-27T00:00:00Z' }, now)).toBe('expired');
    expect(passwordState({ must_change_password: true, temp_password_expires_at: null }, now)).toBe('pending');
  });
});

describe('тексты', () => {
  it('предупреждения называют последствия', () => {
    expect(resetWarning({ username: 'Анна' })).toMatch(/перестанут действовать/);
    expect(roleChangeWarning({ username: 'Анна', role: 'staff' }, 'curator')).toBe('Сменить роль «Анна» с «Сотрудник» на «Куратор»?');
    expect(roleChangeWarning({ username: 'Анна', role: 'staff' }, 'admin')).toMatch(/полный доступ/);
  });

  it('текст для передачи содержит адрес, почту, пароль и срок', () => {
    const text = handoverText(issued, 'https://virtgal.ru');
    expect(text).toContain('https://virtgal.ru/login');
    expect(text).toContain('anna@example.ru');
    expect(text).toContain('Abcd2345Wxyz');
    expect(text).toMatch(/до 4 ноября 2026/);
    expect(formatDate(null)).toBe('—');
  });
});

describe('новый пароль после временного', () => {
  it('проверки до отправки', () => {
    expect(newPasswordProblem('Temp12345678', 'short', 'short')).toMatch(/не короче 8/);
    expect(newPasswordProblem('Temp12345678', 'Temp12345678', 'Temp12345678')).toMatch(/отличаться/);
    expect(newPasswordProblem('Temp12345678', 'НовыйПароль1', 'НовыйПароль2')).toMatch(/не совпадают/);
    expect(newPasswordProblem('Temp12345678', 'НовыйПароль1', 'НовыйПароль1')).toBeNull();
  });
});
