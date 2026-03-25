-- ${flyway:timestamp}

-- Standard Shield
INSERT INTO
    product_exclusions (product_id, coverage_id)
VALUES
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;

-- Premium Shield
INSERT INTO
    product_exclusions (product_id, coverage_id)
VALUES
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;

-- Standard Shield Green
INSERT INTO
    product_exclusions (product_id, coverage_id)
VALUES
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;

-- Premium Shield Green
INSERT INTO
    product_exclusions (product_id, coverage_id)
VALUES
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;