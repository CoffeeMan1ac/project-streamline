INSERT INTO
    coverage_categories (id, code, label, created_at, updated_at)
VALUES
    (
        '0c68af35-8703-448e-b7d2-0c955131d46d',
        'DAMAGE',
        'Damage',
        now (),
        now ()
    ),
    (
        '4edebd06-0764-4f3c-bd49-1ed95ad85325',
        'THEFT',
        'Theft',
        now (),
        now ()
    ),
    (
        'f7e3a0fd-d302-4af5-8165-4c1e1ee09e16',
        'LOSS',
        'Loss',
        now (),
        now ()
    ),
    (
        'a54e0688-dc0b-4159-8146-0270ba9ed812',
        'GLOBAL',
        'Worldwide',
        now (),
        now ()
    ),
    (
        '1b116a27-cd69-4286-bc2c-beeaa11a6454',
        'SUPPORT',
        'Support',
        now (),
        now ()
    ),
    (
        '994e33a1-7269-41ce-8fbc-a08d53130a85',
        'RESOLUTION',
        'Resolution',
        now (),
        now ()
    ),
    (
        '089199d3-3468-483e-8cc4-1405e6a16710',
        'EXCESS',
        'Excess',
        now (),
        now ()
    ) ON CONFLICT (code) DO
UPDATE
SET
    label = EXCLUDED.label,
    updated_at = now ();