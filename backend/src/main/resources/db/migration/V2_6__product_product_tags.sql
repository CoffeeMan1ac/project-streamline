INSERT INTO
    product_tags (id, code, label, created_at, updated_at)
VALUES
    (
        '81a8e5b1-2356-434b-bf1c-78d2be5c9090',
        'GREEN',
        'Eco Friendly',
        now (),
        now ()
    ),
    (
        '1ebe6012-74ac-43ea-9491-54ddff30ab6c',
        'POPULAR',
        'Most Popular',
        now (),
        now ()
    ) ON CONFLICT (code) DO
UPDATE
SET
    label = EXCLUDED.label,
    updated_at = now ();