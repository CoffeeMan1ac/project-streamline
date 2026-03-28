-- ${flyway:timestamp}

INSERT INTO fields (id, code, type, label, required, regex_pattern, options)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'firstName', 'text', 'First Name', true, '^[A-Za-z\s\-]{1,50}$', NULL),
  ('a1000000-0000-0000-0000-000000000002', 'lastName', 'text', 'Last Name', true, '^[A-Za-z\s\-]{1,50}$', NULL),
  ('a1000000-0000-0000-0000-000000000003', 'emailAddress', 'email', 'Email Address', true, '^[^@\s]+@[^@\s]+\.[^@\s]+$', NULL),
  ('a1000000-0000-0000-0000-000000000004', 'phoneNumber', 'text', 'Phone Number', true, '^\+?[0-9\s\-]{7,15}$', NULL),
  ('a1000000-0000-0000-0000-000000000005', 'dateOfBirth', 'date', 'Date of Birth', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000006', 'phoneMake', 'text', 'Phone Make', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000007', 'phoneModel', 'text', 'Phone Model', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000008', 'country', 'text', 'Country', true, NULL, NULL),
  ('a1000000-0000-0000-0000-000000000009', 'phoneAge', 'select', 'Phone Age', true, NULL, '["Less than 1 year", "1 year", "2 years", "3 years", "4+ years"]'),
  ('a1000000-0000-0000-0000-000000000010', 'phoneCondition', 'select', 'Phone Condition', true, NULL, '["Brand New", "Lightly Used", "Good", "Heavily Used", "Damaged"]')
ON CONFLICT (id) DO UPDATE SET
  code          = EXCLUDED.code,
  type          = EXCLUDED.type,
  label         = EXCLUDED.label,
  required      = EXCLUDED.required,
  regex_pattern = EXCLUDED.regex_pattern,
  options       = EXCLUDED.options,
  updated_at    = now();