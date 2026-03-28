ALTER TABLE products DROP CONSTRAINT IF EXISTS products_name_key;
CREATE UNIQUE INDEX products_name_unique_not_deleted ON products (name) WHERE deleted = false;