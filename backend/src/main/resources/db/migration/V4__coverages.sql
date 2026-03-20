INSERT INTO
    coverages (
        id,
        product_type_id,
        category_id,
        code,
        label,
        created_at,
        updated_at
    )
VALUES
    (
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '0c68af35-8703-448e-b7d2-0c955131d46d', -- DAMAGE category id
        'ACCIDENTIAL_DAMAGE',
        'Accidental damage cover',
        now (),
        now ()
    ),
    (
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '0c68af35-8703-448e-b7d2-0c955131d46d', -- DAMAGE category id
        'CRACKED_SCREEN',
        'Cracked screen protection',
        now (),
        now ()
    ),
    (
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '0c68af35-8703-448e-b7d2-0c955131d46d', -- DAMAGE category id
        'LIQUID_DAMAGE',
        'Liquid damage cover',
        now (),
        now ()
    ),
    (
        'b0a1d57d-ff80-4bc3-b951-a1fbb7950050',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '994e33a1-7269-41ce-8fbc-a08d53130a85', -- RESOLUTION category id,
        'LOCAL_REPLACEMENT',
        'Next day brand new replacement phone',
        now (),
        now ()
    ),
    (
        '089199d3-3468-483e-8cc4-1405e6a16710',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '1b116a27-cd69-4286-bc2c-beeaa11a6454', -- SUPPORT category id,
        'LOCAL_SUPPORT',
        '24/7 claims support',
        now (),
        now ()
    ),
    (
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '4edebd06-0764-4f3c-bd49-1ed95ad85325', -- THEFT category id,
        'THEFT_PROTECTION',
        'Theft protection',
        now (),
        now ()
    ),
    (
        '7bd499f8-c54a-4672-9206-56e7ff752a3c',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        'f7e3a0fd-d302-4af5-8165-4c1e1ee09e16', -- THEFT category id,
        'LOSS_COVERAGE',
        'Loss coverage',
        now (),
        now ()
    ),
    (
        '76504918-daec-415d-928c-b7fa305d2f67',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '1b116a27-cd69-4286-bc2c-beeaa11a6454', -- SUPPORT category id
        'GLOBAL_SUPPORT',
        'Wordlwide claim support',
        now (),
        now ()
    ),
    (
        'd925f34c-d013-4dd6-8895-57cfbe3d9664',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '089199d3-3468-483e-8cc4-1405e6a16710', -- SUPPORT category id
        'NO_EXCESS_FC',
        'No excess on first claim',
        now (),
        now ()
    ),
    (
        '3976399b-2802-47c4-b308-7e90d499ce92',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        'a54e0688-dc0b-4159-8146-0270ba9ed812', -- GLOBAL category id,
        'GLOBAL_COVERAGE',
        'Global coverage in 150+ countries',
        now (),
        now ()
    ),
    (
        '3172e37a-912d-40ca-9d84-2e4b806324e3',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '994e33a1-7269-41ce-8fbc-a08d53130a85', -- RESOLUTION category id,
        'GLOBAL_REPLACEMENT',
        'Same day brand new replacement phone worldwide',
        now (),
        now ()
    ),
    (
        'ae90d866-8138-4485-b347-d34d83df58ba',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '5038b4bc-effa-4f5f-9000-f7423d7ae2ec', -- GREEN category id,
        'LOCAL_GREEN_REPLACEMENT',
        'Next day refurbished replacement phone',
        now (),
        now ()
    ),
    (
        'a7df9472-dad6-47ac-aee2-3191d2a0b0be',
        '9333558f-9a40-4ad6-b20b-7f45246c70ea', -- PHONE_INSURANCE product_type id
        '5038b4bc-effa-4f5f-9000-f7423d7ae2ec', -- GREEN category id,
        'GLOBAL_GREEN_REPLACEMENT',
        'Same day refurbished phone worldwide',
        now (),
        now ()
    ) ON CONFLICT (code) DO
UPDATE
SET
    product_type_id = EXCLUDED.product_type_id,
    category_id = EXCLUDED.category_id,
    label = EXCLUDED.label,
    updated_at = now ();