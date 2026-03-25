-- ${flyway:timestamp}

INSERT INTO products (
  id,
  base_rate,
  name,
  product_type_id,
  description,
  start_date,
  end_date,
  active,
  created_at,
  updated_at
)
VALUES
(
  'bd7e7bd6-201f-466a-9155-74757a2b4b95',
  7.99,
  'Standard Shield Green',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Standard Shield Green protects your phone against accidental and liquid damage, and if a replacement is needed, provides a refurbished device to support a more environmentally friendly solution',
  now(),
  NULL,
  true,
  now(),
  now()
),
(
  '1ef9d485-b72c-4983-8aa9-5daeb4693709',
  9.99,
  'Standard Shield',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Standard Shield protects against accidental and liquid damage to your phone.',
  now(),
  NULL,
  true,
  now(),
  now()
),
(
  'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
  11.99,
  'Premium Shield Green',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Premium Shield Green protects your phone against accidental and liquid damage, as well as loss and theft, and provides a refurbished replacement when needed, helping reduce environmental impact.',
  now(),
  NULL,
  true,
  now(),
  now()
),
(
  '5f257c25-924a-440a-87c0-e3d8efa635a4',
  14.99,
  'Premium Shield',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Premium Shield covers accidental and liquid damage, plus loss and theft of your phone.',
  now(),
  NULL,
  true,
  now(),
  now()
),
(
  '4ca1c734-42b2-46b9-8710-b40800f89157',
  15.99,
  'Global Shield Green',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Global Shield Green protects your phone against accidental and liquid damage, loss, and theft, with worldwide coverage, and provides a refurbished replacement when needed to reduce environmental impact.',
  now(),
  NULL,
  true,
  now(),
  now()
),
(
  '90e4ad03-2505-41db-a5b6-03bd84cca6df',
  19.99,
  'Global Shield',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Global Shield protects against accidental and liquid damage, loss, and theft, with worldwide cover wherever you travel.',
  now(),
  NULL,
  true,
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  base_rate      = EXCLUDED.base_rate,
  name           = EXCLUDED.name,
  product_type_id= EXCLUDED.product_type_id,
  description    = EXCLUDED.description,
  start_date     = EXCLUDED.start_date,
  end_date       = EXCLUDED.end_date,
  active         = EXCLUDED.active,
  updated_at     = now();
