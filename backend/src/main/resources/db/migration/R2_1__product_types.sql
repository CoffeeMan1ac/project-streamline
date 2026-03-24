INSERT INTO
    product_types (id, code, label, created_at, updated_at)
VALUES
    (
        '9333558f-9a40-4ad6-b20b-7f45246c70ea',
        'PHONE_INSURANCE',
        'Phone Insurance',
        now (),
        now ()
    ) ON CONFLICT (code) DO
UPDATE
SET
    label = EXCLUDED.label,
    updated_at = now ();