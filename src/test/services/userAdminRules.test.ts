import {
  generateTemporaryPassword, isRole, validateAdminPassword, validateEmail, validateUsername, issuedBeforePasswordChange,
} from '../../services/userAdmin';
import { allowedWhileChangingPassword } from '../../middleware/accessPolicy';

describe('имя пользователя и e-mail', () => {
  it('принимает обычные значения', () => {
    expect(validateUsername('Анна Иванова')).toBeNull();
    expect(validateUsername('curator_01')).toBeNull();
    expect(validateEmail('anna.ivanova@gallery.example.ru')).toBeNull();
    expect(validateEmail('  a@b.co ')).toBeNull();
  });

  it('отвергает кавычки (в том числе типографские), скобки и служебные знаки', () => {
    for (const bad of ['“tulubyev', 'tulubyev”', "O'Brien", 'a"b', '<b>x</b>', 'a\\b', 'x\u0000y', '«имя»', 'a`b']) {
      expect(validateUsername(bad)).not.toBeNull();
    }
    expect(validateEmail('“alt@in2sys.fr”')).not.toBeNull();
    expect(validateEmail('alt@in2sys.fr”')).not.toBeNull();
  });

  it('длина и формат', () => {
    expect(validateUsername('a')).not.toBeNull();
    expect(validateUsername('a', 1)).toBeNull();
    expect(validateUsername('я'.repeat(51))).not.toBeNull();
    expect(validateUsername(undefined)).not.toBeNull();
    for (const bad of ['', 'no-at.example.com', 'a@b', 'a b@c.de', 'a@@c.de', `${'x'.repeat(100)}@c.de`]) expect(validateEmail(bad)).not.toBeNull();
    expect(validateEmail(42)).not.toBeNull();
  });
});

describe('пароль, заданный администратором', () => {
  it('не короче 8 знаков, не длиннее 72 байт, без пробелов по краям', () => {
    expect(validateAdminPassword('Abcdef12')).toBeNull();
    expect(validateAdminPassword('короткий')).toBeNull();                       // 8 знаков кириллицей — 16 байт
    expect(validateAdminPassword('Abc12')).not.toBeNull();
    expect(validateAdminPassword('я'.repeat(40))).not.toBeNull();               // 80 байт: bcrypt обрезал бы
    expect(validateAdminPassword(' Abcdef12')).not.toBeNull();
    expect(validateAdminPassword(12345678 as any)).not.toBeNull();
  });
});

describe('временный пароль', () => {
  it('12 знаков, есть заглавная, строчная и цифра, без похожих знаков', () => {
    for (let i = 0; i < 200; i++) {
      const p = generateTemporaryPassword();
      expect(p).toHaveLength(12);
      expect(p).toMatch(/[A-Z]/);
      expect(p).toMatch(/[a-z]/);
      expect(p).toMatch(/[2-9]/);
      expect(p).not.toMatch(/[01OIl]/);
    }
  });
  it('пароли не повторяются', () => {
    const seen = new Set(Array.from({ length: 500 }, () => generateTemporaryPassword()));
    expect(seen.size).toBe(500);
  });
});

describe('роли и токены', () => {
  it('роль — только из списка', () => {
    expect(isRole('admin')).toBe(true);
    expect(isRole('superuser')).toBe(false);
    expect(isRole(undefined)).toBe(false);
  });
  it('токен, выданный до смены пароля, недействителен; выданный в ту же секунду или позже — действителен', () => {
    const changed = new Date('2026-10-28T12:00:00.900Z');
    const sec = Math.floor(changed.getTime() / 1000);
    expect(issuedBeforePasswordChange(sec - 1, changed)).toBe(true);
    expect(issuedBeforePasswordChange(sec, changed)).toBe(false);
    expect(issuedBeforePasswordChange(sec + 5, changed)).toBe(false);
    expect(issuedBeforePasswordChange(sec - 100, null)).toBe(false);
    expect(issuedBeforePasswordChange(undefined, changed)).toBe(false);
  });
});

describe('что доступно с временным паролем', () => {
  it('только свой профиль и смена пароля', () => {
    expect(allowedWhileChangingPassword('GET', '/auth/me')).toBe(true);
    expect(allowedWhileChangingPassword('GET', '/auth/me/')).toBe(true);
    expect(allowedWhileChangingPassword('PUT', '/auth/me/password')).toBe(true);
    expect(allowedWhileChangingPassword('PUT', '/auth/me')).toBe(false);
    expect(allowedWhileChangingPassword('POST', '/auth/me/avatar')).toBe(false);
    expect(allowedWhileChangingPassword('GET', '/artwork-cards')).toBe(false);
    expect(allowedWhileChangingPassword('GET', '/admin/users')).toBe(false);
  });
});
