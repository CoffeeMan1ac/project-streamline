CREATE TABLE forms (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE form_sections (
    id UUID PRIMARY KEY,
    form_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_form_sections_form
        FOREIGN KEY (form_id) REFERENCES forms(id)
);

CREATE TABLE form_section_fields (
    section_id UUID NOT NULL,
    field_id UUID NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (section_id, field_id),
    CONSTRAINT fk_form_section_fields_section
        FOREIGN KEY (section_id) REFERENCES form_sections(id),
    CONSTRAINT fk_form_section_fields_field
        FOREIGN KEY (field_id) REFERENCES fields(id)
);
