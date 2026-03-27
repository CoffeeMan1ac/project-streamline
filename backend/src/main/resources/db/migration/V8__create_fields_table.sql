CREATE TABLE fields (
    id UUID PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    required BOOLEAN NOT NULL DEFAULT FALSE,
    regex_pattern VARCHAR(255),
    options JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
