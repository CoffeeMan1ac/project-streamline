ALTER TABLE product_product_tags DROP CONSTRAINT fk_product_product_tags_tag;
ALTER TABLE product_product_tags ADD CONSTRAINT fk_product_product_tags_tag
    FOREIGN KEY (product_tag_id) REFERENCES product_tags(id) ON DELETE CASCADE;