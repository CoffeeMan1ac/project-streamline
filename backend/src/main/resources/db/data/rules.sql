INSERT INTO rules (
  id,
  product_id,
  name,
  description,
  priority,
  active,
  condition_field,
  condition_operator,
  condition_value,
  action_type,
  action_reason,
  created_at,
  updated_at
)
VALUES
(
  'ced07ed5-4540-44e1-b622-7bde75cec806',
  '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
  'Product not available in the United Kingdom',
  'This product is unavailable in the United Kingdom.',
  1,
  true,
  'country',
  'EQUALS',
  'uk',
  'DECLINE',
  'This product is unavailable in the United Kingdom.',
  now(),
  now()
),
(
  '0b142497-e86d-457c-9ddd-d548ad1521a5',
  '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
  'Product not available in the United States',
  'This product is unavailable in the United States.',
  1,
  true,
  'country',
  'EQUALS',
  'usa',
  'DECLINE',
  'This product is unavailable in the United States.',
  now(),
  now()
),
(
  'e6a21e12-2f26-4dc7-9946-2b95992eb5a6',
  '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
  'Samsung Galaxy Note 7 Auto Decline',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  1,
  true,
  'phoneModel',
  'EQUALS',
  'Galaxy Note 7',
  'DECLINE',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  now(),
  now()
),
(
  'ca66832d-1904-48ce-ac21-079abd7bf64a',
  '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
  'Product not available in the United Kingdom',
  'This product is unavailable in the United Kingdom.',
  1,
  true,
  'country',
  'EQUALS',
  'uk',
  'DECLINE',
  'This product is unavailable in the United Kingdom.',
  now(),
  now()
),
(
  '004e61f9-aec7-43de-a21f-818d92179c28',
  '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
  'Product not available in the United States',
  'This product is unavailable in the United States.',
  1,
  true,
  'country',
  'EQUALS',
  'usa',
  'DECLINE',
  'This product is unavailable in the United States.',
  now(),
  now()
),
(
  '0c4760c6-dbfc-4cf4-9bed-4e998a32553f',
  '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
  'Samsung Galaxy Note 7 Auto Decline',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  1,
  true,
  'phoneModel',
  'EQUALS',
  'Galaxy Note 7',
  'DECLINE',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  now(),
  now()
),
(
  '0a3e4d33-ee0a-4219-9342-086a4ad217c1',
  '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
  'Samsung Galaxy Note 7 Auto Decline',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  1,
  true,
  'phoneModel',
  'EQUALS',
  'Galaxy Note 7',
  'DECLINE',
  'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  product_id          = EXCLUDED.product_id,
  name                = EXCLUDED.name,
  description         = EXCLUDED.description,
  priority            = EXCLUDED.priority,
  active              = EXCLUDED.active,
  condition_field     = EXCLUDED.condition_field,
  condition_operator  = EXCLUDED.condition_operator,
  condition_value     = EXCLUDED.condition_value,
  action_type         = EXCLUDED.action_type,
  action_reason       = EXCLUDED.action_reason,
  updated_at          = now()
;
