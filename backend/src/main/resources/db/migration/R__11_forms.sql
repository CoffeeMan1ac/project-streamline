-- ${flyway:timestamp}

-- Form: Mobile Phone Insurance
INSERT INTO forms (id, name, description, created_at, updated_at)
VALUES ('b2000000-0000-0000-0000-000000000001', 'Mobile Phone Insurance', 'Standard form for mobile phone insurance products', now(), now())
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at  = now();

-- Section 1: Personal Information
INSERT INTO form_sections (id, form_id, name, label, display_order, created_at, updated_at)
VALUES ('c3000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001', 'personal_info', 'Personal Information', 0, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name          = EXCLUDED.name,
  label         = EXCLUDED.label,
  display_order = EXCLUDED.display_order,
  updated_at    = now();

-- Section 2: Device Information
INSERT INTO form_sections (id, form_id, name, label, display_order, created_at, updated_at)
VALUES ('c3000000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000001', 'device_info', 'Device Information', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET
  name          = EXCLUDED.name,
  label         = EXCLUDED.label,
  display_order = EXCLUDED.display_order,
  updated_at    = now();

-- Link fields to sections
DELETE FROM form_section_fields WHERE section_id IN (
  'c3000000-0000-0000-0000-000000000001',
  'c3000000-0000-0000-0000-000000000002'
);

-- Personal Information fields
INSERT INTO form_section_fields (section_id, field_id, display_order) VALUES
  ('c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 0),
  ('c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 1),
  ('c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 2),
  ('c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 3),
  ('c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005', 4);

-- Device Information fields
INSERT INTO form_section_fields (section_id, field_id, display_order) VALUES
  ('c3000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000006', 0),
  ('c3000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007', 1),
  ('c3000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000008', 2),
  ('c3000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000009', 3),
  ('c3000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000010', 4);

-- Link form to all existing products
UPDATE products SET form_id = 'b2000000-0000-0000-0000-000000000001'
WHERE id IN (
  'bd7e7bd6-201f-466a-9155-74757a2b4b95',
  '1ef9d485-b72c-4983-8aa9-5daeb4693709',
  'e4c364c6-962f-48bc-9eea-c36ac5091dc9',
  '5f257c25-924a-440a-87c0-e3d8efa635a4',
  '4ca1c734-42b2-46b9-8710-b40800f89157',
  '90e4ad03-2505-41db-a5b6-03bd84cca6df'
);
