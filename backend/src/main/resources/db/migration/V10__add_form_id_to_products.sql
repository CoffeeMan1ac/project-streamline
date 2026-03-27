ALTER TABLE products ADD COLUMN form_id UUID;

ALTER TABLE products ADD CONSTRAINT fk_products_form
    FOREIGN KEY (form_id) REFERENCES forms(id);
