CREATE TABLE product_types (
    id UUID PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    label VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE coverage_categories (
    id UUID PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    label VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE coverages (
    id UUID PRIMARY KEY,
    product_type_id UUID NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    label VARCHAR(255) NOT NULL,
    category_id UUID NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_coverages_product_type
        FOREIGN KEY (product_type_id) REFERENCES product_types(id),
    CONSTRAINT fk_coverages_category
        FOREIGN KEY (category_id) REFERENCES coverage_categories(id)
);

CREATE TABLE product_tags (
    id UUID PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    label VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    base_rate NUMERIC NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    product_type_id UUID NOT NULL,
    description VARCHAR(255),
    product_fields JSONB,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_products_product_type
        FOREIGN KEY (product_type_id) REFERENCES product_types(id)
);

CREATE TABLE product_product_tags (
    product_id UUID NOT NULL,
    product_tag_id UUID NOT NULL,
    PRIMARY KEY (product_id, product_tag_id),
    CONSTRAINT fk_product_product_tags_product
        FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_product_product_tags_tag
        FOREIGN KEY (product_tag_id) REFERENCES product_tags(id)
);

CREATE TABLE product_coverages (
    product_id UUID NOT NULL,
    coverage_id UUID NOT NULL,
    PRIMARY KEY (product_id, coverage_id),
    CONSTRAINT fk_product_coverages_product
        FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_product_coverages_coverage
        FOREIGN KEY (coverage_id) REFERENCES coverages(id)
);

CREATE TABLE product_exclusions (
    product_id UUID NOT NULL,
    coverage_id UUID NOT NULL,
    PRIMARY KEY (product_id, coverage_id),
    CONSTRAINT fk_product_exclusions_product
        FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_product_exclusions_coverage
        FOREIGN KEY (coverage_id) REFERENCES coverages(id)
);

CREATE TABLE rules (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    reason VARCHAR(255),
    priority INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    rule_config JSONB NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_rules_product
        FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE quotations (
    id UUID PRIMARY KEY,
    reference VARCHAR(6) NOT NULL UNIQUE,
    status VARCHAR(255) NOT NULL,
    reason VARCHAR(255),
    premium NUMERIC,
    processing_time_ms BIGINT NOT NULL
);

CREATE TABLE quotation_rules_applied (
    quotation_id UUID NOT NULL,
    rule_name VARCHAR(255),
    CONSTRAINT fk_quotation_rules_applied_quotation
        FOREIGN KEY (quotation_id) REFERENCES quotations(id)
);

CREATE TABLE decisions (
    id UUID PRIMARY KEY,
    request_data TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    premium NUMERIC,
    reason VARCHAR(255),
    rules_applied TEXT,
    processing_time_ms BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);