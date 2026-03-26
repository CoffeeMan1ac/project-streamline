UPDATE product_tags SET color = 'green' WHERE code = 'GREEN';
UPDATE product_tags SET color = 'blue' WHERE code = 'POPULAR';

ALTER TABLE product_tags ALTER COLUMN color SET DEFAULT 'blue';
ALTER TABLE product_tags ALTER COLUMN color SET NOT NULL;