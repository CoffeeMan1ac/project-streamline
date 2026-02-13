INSERT INTO products (
  id,
  base_rate,
  name,
  product_type_id,
  description,
  most_popular,
  start_date,
  end_date,
  active,
  created_at,
  updated_at
)
VALUES
(
  '1ef9d485-b72c-4983-8aa9-5daeb4693709',
  9.99,
  'Standard Shield',
  '9333558f-9a40-4ad6-b20b-7f45246c70ea',
  'Standard Shield protects against accidental and liquid damage to your phone.',
  false,
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
  true,
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
  false,
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
  most_popular   = EXCLUDED.most_popular,
  start_date     = EXCLUDED.start_date,
  end_date       = EXCLUDED.end_date,
  active         = EXCLUDED.active,
  updated_at     = now();
