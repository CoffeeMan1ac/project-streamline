CREATE SEQUENCE IF NOT EXISTS quote_reference_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE quotation
    ADD CONSTRAINT uk_quotation_reference UNIQUE (reference);