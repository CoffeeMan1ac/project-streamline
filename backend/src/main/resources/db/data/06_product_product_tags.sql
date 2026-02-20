INSERT INTO
    product_product_tags (product_id, product_tag_id)
VALUES
    (
        'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
        '81a8e5b1-2356-434b-bf1c-78d2be5c9090' -- GREEN product tag
    ),
    (
        'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
        '81a8e5b1-2356-434b-bf1c-78d2be5c9090' -- GREEN product tag
    ),
    (
        '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
        '81a8e5b1-2356-434b-bf1c-78d2be5c9090' -- GREEN product tag
    ),
    (
        '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
        '1ebe6012-74ac-43ea-9491-54ddff30ab6c' -- POPULAR product tag
    ) ON CONFLICT DO NOTHING;