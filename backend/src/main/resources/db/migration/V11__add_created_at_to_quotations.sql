ALTER TABLE quotations
ADD COLUMN created_at TIMESTAMP;

UPDATE quotations
SET created_at = CURRENT_TIMESTAMP
WHERE created_at IS NULL;

ALTER TABLE quotations
ALTER COLUMN created_at SET NOT NULL;