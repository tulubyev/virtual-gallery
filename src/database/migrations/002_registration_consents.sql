-- Согласие на обработку персональных данных при заявке на участие: отдельно от принятия правил (ст. 9 152-ФЗ).
-- Версии документов записываются вместе с отпечатком текста (см. src/services/legalDocs.ts): «0.1-draft#a1b2c3d4».
ALTER TABLE bidding_registrations
  ADD COLUMN pd_consent_at TIMESTAMPTZ,
  ADD COLUMN pd_consent_version TEXT;
