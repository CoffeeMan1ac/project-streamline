ALTER TABLE product_coverages DROP CONSTRAINT fk_product_coverages_coverage;
ALTER TABLE product_coverages ADD CONSTRAINT fk_product_coverages_coverage
    FOREIGN KEY (coverage_id) REFERENCES coverages(id) ON DELETE CASCADE;

ALTER TABLE product_exclusions DROP CONSTRAINT fk_product_exclusions_coverage;
ALTER TABLE product_exclusions ADD CONSTRAINT fk_product_exclusions_coverage
    FOREIGN KEY (coverage_id) REFERENCES coverages(id) ON DELETE CASCADE;