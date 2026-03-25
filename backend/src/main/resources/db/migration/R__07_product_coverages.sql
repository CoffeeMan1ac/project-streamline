-- ${flyway:timestamp}

-- Standard Shield Green
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        '089199d3-3468-483e-8cc4-1405e6a16710'
    ), -- LOCAL_SUPPORT
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95',
        'ae90d866-8138-4485-b347-d34d83df58ba'
    ) -- LOCAL_GREEN_REPLACEMENT
    ON CONFLICT DO NOTHING;

-- Standard Shield
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        '089199d3-3468-483e-8cc4-1405e6a16710'
    ), -- LOCAL_SUPPORT
    (
        '1ef9d485-b72c-4983-8aa9-5daeb4693709',
        'b0a1d57d-ff80-4bc3-b951-a1fbb7950050'
    ) -- LOCAL_REPLACEMENT
    ON CONFLICT DO NOTHING;

-- Premium Shield Green
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '089199d3-3468-483e-8cc4-1405e6a16710'
    ), -- LOCAL_SUPPORT
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        'ae90d866-8138-4485-b347-d34d83df58ba'
    ), -- LOCAL_GREEN_REPLACEMENT
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
        'd925f34c-d013-4dd6-8895-57cfbe3d9664'
    ) -- NO_EXCESS_FC
    ON CONFLICT DO NOTHING;

-- Premium Shield
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '089199d3-3468-483e-8cc4-1405e6a16710'
    ), -- LOCAL_SUPPORT
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        'b0a1d57d-ff80-4bc3-b951-a1fbb7950050'
    ), -- LOCAL_REPLACEMENT
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4',
        'd925f34c-d013-4dd6-8895-57cfbe3d9664'
    ) -- NO_EXCESS_FC
    ON CONFLICT DO NOTHING;

-- Global Shield Green
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '76504918-daec-415d-928c-b7fa305d2f67'
    ), -- GLOBAL_SUPPORT
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        'a7df9472-dad6-47ac-aee2-3191d2a0b0be'
    ), -- GLOBAL_GREEN_REPLACEMENT
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        'd925f34c-d013-4dd6-8895-57cfbe3d9664'
    ), -- NO_EXCESS_FC
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;

-- Global Shield
INSERT INTO
    product_coverages (product_id, coverage_id)
VALUES
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        'f0c6322a-e2c0-4379-8dfb-4cc40fc0551c'
    ), -- ACCIDENTIAL_DAMAGE
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '52dcd2eb-c321-490c-b8fc-ffff1f0e74bd'
    ), -- CRACKED_SCREEN
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '8adf08c0-5d90-402d-8e02-8af1919f4cb3'
    ), -- LIQUID_DAMAGE
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '76504918-daec-415d-928c-b7fa305d2f67'
    ), -- GLOBAL_SUPPORT
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '3172e37a-912d-40ca-9d84-2e4b806324e3'
    ), -- GLOBAL_REPLACEMENT
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '5881ae6f-c256-42aa-88ac-044cbc2ac8f8'
    ), -- THEFT_PROTECTION
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '7bd499f8-c54a-4672-9206-56e7ff752a3c'
    ), -- LOSS_COVERAGE
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        'd925f34c-d013-4dd6-8895-57cfbe3d9664'
    ), -- NO_EXCESS_FC
    (
        '90e4ad03-2505-41db-a5b6-03bd84cca6df',
        '3976399b-2802-47c4-b308-7e90d499ce92'
    ) -- GLOBAL_COVERAGE
    ON CONFLICT DO NOTHING;