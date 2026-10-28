-- 007: управление пользователями администратором — временные пароли и журнал действий.
--  * must_change_password — пользователь обязан сменить пароль, прежде чем пользоваться сайтом (временный пароль выдан администратором);
--  * temp_password_expires_at — до какого времени временный пароль годится для входа;
--  * password_changed_at — когда пароль менялся в последний раз: токены, выданные раньше, перестают действовать
--    (сброс пароля администратором закрывает все прежние сессии пользователя).
-- Журнал user_admin_log: кто, что и с кем сделал. Пароли и хеши в него не пишутся.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS must_change_password     BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS temp_password_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS password_changed_at      TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS user_admin_log (
  log_id     BIGSERIAL PRIMARY KEY,
  actor_id   INTEGER,                         -- кто выполнил (без внешнего ключа: журнал переживает удаление пользователей)
  target_id  INTEGER,                         -- с кем
  action     TEXT NOT NULL CHECK (action IN ('create', 'update', 'role', 'reset_password', 'delete')),
  details    JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_admin_log_target ON user_admin_log (target_id, created_at DESC);
