-- ${flyway:timestamp}

INSERT INTO fields (id, code, type, label, required, regex_pattern, options)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'first_name', 'text', 'First Name', true, '^[A-Za-z\s\-]{1,50}$', NULL),
  ('a1000000-0000-0000-0000-000000000002', 'last_name', 'text', 'Last Name', true, '^[A-Za-z\s\-]{1,50}$', NULL),
  ('a1000000-0000-0000-0000-000000000003', 'email', 'email', 'Email Address', true, '^[^@\s]+@[^@\s]+\.[^@\s]+$', NULL),
  ('a1000000-0000-0000-0000-000000000004', 'phone_number', 'text', 'Phone Number', true, '^\+?[0-9\s\-]{7,15}$', NULL),
  ('a1000000-0000-0000-0000-000000000005', 'date_of_birth', 'date', 'Date of Birth', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000006', 'device_make', 'text', 'Device Make', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000007', 'device_model', 'text', 'Device Model', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000008', 'device_value', 'number', 'Device Value', true, '^\d+(\.\d{1,2})?$', NULL),
  ('a1000000-0000-0000-0000-000000000009', 'purchase_date', 'date', 'Purchase Date', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000010', 'device_condition', 'select', 'Device Condition', true, NULL, '["New", "Like New", "Good", "Fair"]')
ON CONFLICT (id) DO UPDATE SET
  code          = EXCLUDED.code,
  type          = EXCLUDED.type,
  label         = EXCLUDED.label,
  required      = EXCLUDED.required,
  regex_pattern = EXCLUDED.regex_pattern,
  options       = EXCLUDED.options,
  updated_at    = now();
