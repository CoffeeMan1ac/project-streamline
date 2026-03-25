INSERT INTO
  rules (
    id,
    product_id,
    name,
    description,
    reason,
    priority,
    active,
    rule_config,
    created_at,
    updated_at
  )
VALUES
  (
    'ced07ed5-4540-44e1-b622-7bde75cec806',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Product not available in the selected country',
    'This product is unavailable in the selected country',
    'This product is unavailable in the selected country',
    1,
    true,
    '{"when":{"match":"ANY","conditions":[{"field":"country","operator":"EQUALS","value":"uk"}, {"field":"country","operator":"EQUALS","value":"usa"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '5b3297ff-1502-410c-9507-a79fa96ee57d',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '16f4e8e9-bbc3-4f82-bba5-2a0b6fad2546',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '227e6aa9-e78c-4022-9fdf-45f9c90d4d88',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'e04707eb-9a58-4767-89f0-4118b7b121e5',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '133b7601-89aa-4146-bdde-0b864082ccef',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    '0deb1413-c895-4592-b683-0d813e796f97',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    'e6a21e12-2f26-4dc7-9946-2b95992eb5a6',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '81c81fab-7e3f-4d9c-be9d-85a1c7b2f0d8',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'b1d96efa-61a8-42b9-9f26-6ef9d0ba7ec3',
    '1ef9d485-b72c-4983-8aa9-5daeb4693709', -- Standard Shield
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    10,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":5.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  ),
  (
    'ca66832d-1904-48ce-ac21-079abd7bf64a',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Product not available in the selected country',
    'This product is unavailable in the selected country',
    'This product is unavailable in the selected country',
    1,
    true,
    '{"when":{"match":"ANY","conditions":[{"field":"country","operator":"EQUALS","value":"uk"}, {"field":"country","operator":"EQUALS","value":"usa"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '0c4760c6-dbfc-4cf4-9bed-4e998a32553f',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '9e0b0c67-edaf-4528-a5b4-87e607b821b5',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'd9866c96-4da9-4b71-91d5-4e4ff4219e5a',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'e194f57b-706a-436a-a325-acd0290478fd',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '888b3676-74a5-4dd9-91b9-adf013cd4115',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'b12f139b-2194-42a7-992d-1fe73cf8a74c',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    'fa3f8353-2e0d-45bd-8e3c-4e7aec04eced',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    '058802c9-1554-407e-b0db-bbdb561374f5',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'c98272c3-833e-4f0d-aa18-f0c691906a59',
    '5f257c25-924a-440a-87c0-e3d8efa635a4', -- Premium Shield
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    10,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":7.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  ),
  (
    '0a3e4d33-ee0a-4219-9342-086a4ad217c1',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    1,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'cb3db399-2ba3-4f8a-9426-bf1816f7c00e',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '1bf6459f-9a27-4b0e-bc38-dbbf21fd09e2',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'ec54ff77-eb8c-4b27-baaf-03f20392aa0d',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '5270f510-4201-4dd6-b4dc-5b6a44354db0',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'f2b68d86-088e-4aeb-86c5-d1946cc136a2',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    'cb6c9256-0b3e-42ca-9f8d-046e6abb8f70',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    'e8218679-1b23-447b-a90d-6146cb3a69b9',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '6b58ae74-d6ef-4f9a-b1c2-de6275e0a203',
    '90e4ad03-2505-41db-a5b6-03bd84cca6df', -- Global Shield
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":9.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  ),
  (
    '488fef05-dc14-47f0-a77c-465eb9fabf8f',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Product not available in the selected country',
    'This product is unavailable in the selected country',
    'This product is unavailable in the selected country',
    1,
    true,
    '{"when":{"match":"ANY","conditions":[{"field":"country","operator":"EQUALS","value":"uk"}, {"field":"country","operator":"EQUALS","value":"usa"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'dde0eb84-dbfd-49d4-a39e-e961b07e7cac',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '39cd57e9-c3f6-4d32-b34f-6a1d2f1dc80c',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '83862a5b-8d60-4596-826f-b4420e92725a',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '7a3563a4-3e7b-4b0f-b1d9-3c0ff42ca8e6',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '203560f7-6253-42de-b61a-a85d98633b05',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    '966899ec-cbd7-4936-8169-7dac8942dbcd',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    'fcfa3332-0162-4c6f-beba-b38545f2f91c',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '0c994dc8-abf0-4f35-87fe-9b36d9903d72',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '166077e4-77a9-465b-834a-87f258209e3a',
    'bd7e7bd6-201f-466a-9155-74757a2b4b95', -- Standard Shield Green
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    10,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":3.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  ),
  (
    'bb7fde20-0176-4d1a-9b67-ce07f291376f',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Product not available in the selected country',
    'This product is unavailable in the selected country',
    'This product is unavailable in the selected country',
    1,
    true,
    '{"when":{"match":"ANY","conditions":[{"field":"country","operator":"EQUALS","value":"uk"}, {"field":"country","operator":"EQUALS","value":"usa"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '1afc33a1-109e-4de1-a139-d3ca0b295a59',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'b6ae5c5c-ee8d-49d3-85c5-ed551fb3358a',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '03d2f83a-f4cb-48a8-8def-5d2f0df5b492',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '8023b61e-a8e4-4dfd-bc1a-538c0d91f7e9',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '2670d53b-4749-47b2-a2fb-cd50998389ff',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '2258168e-7cca-4515-8a94-c18617a09c84',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    '2e9403ce-5360-4053-98f7-7fab910fec9f',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    '982410a9-5a5b-4924-88d5-dc2055e11907',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    'd0c8dc18-ae46-47ef-84bf-fe554e20a90d',
    'e4c364c6-962f-48bc-9eea-c36ac5091dc9', -- Premium Shield Green
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    10,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":5.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  ),
  (
    '003bdbee-4ac8-42c7-8e37-c7fee14d13d5',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Samsung Galaxy Note 7 Auto Decline',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    'The samsung galaxy note 7 has manufacturing issues and is not insurable.',
    1,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneModel","operator":"EQUALS","value":"Galaxy Note 7"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'bcc90bf0-a2b1-4632-84ab-1a8fdb129b99',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Decline if phone is damaged',
    'This mobile phone can not be insured if it is damaged.',
    'This mobile phone can not be insured if it is damaged.',
    2,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"damaged"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    'fe97bf20-f5d5-46c0-95c8-1610d414ffc9',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Decline if phone is too old',
    'This mobile phone can not be insured as it is over 4 years old.',
    'This mobile phone can not be insured as it is over 4 years old.',
    3,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneAge","operator":"EQUALS","value":"4+ years"}]},"then":{"decision":"DECLINE","premiumOverride":null,"premiumDelta":null,"stop":false}}',
    now (),
    now ()
  ),
  (
    '51f08e2b-9674-4f66-91db-b09bcfa5027e',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Student Discount',
    '10% Student Discount',
    'A 10% Student Discount has been applied',
    4,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"student"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":-0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '11b13c09-5d58-4dd7-8f83-4745224bee2b',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Lightly Damaged Phone',
    '10% Delta for lightly used phone',
    'This mobile phone has been lightly used and thus will have a higher premium.',
    5,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"lightly used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '435cc692-49d1-4a8f-8d9d-1b4f4b910970',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Good condition phone',
    '20% Delta for good condition phone',
    'This mobile phone is in good condition and thus will have a higher premium.',
    6,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"good"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.2,"stop":false}}',
    now (),
    now ()
  ),
  (
    '08c80e16-5986-4cb7-a6cd-a96af31a33d9',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Heavily used phone',
    '30% Delta for heavily used phone',
    'This mobile phone has been heavily used and thus will have a higher premium.',
    7,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneCondition","operator":"EQUALS","value":"heavily used"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.3,"stop":false}}',
    now (),
    now ()
  ),
  (
    '2c98912f-b560-4c69-95e0-32bd8bddeda6',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Apple Tax',
    'Apple phones are more likely to be involved in higher cost claims.',
    'Apple phones are more likely to be involved in higher cost claims.',
    8,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"phoneMake","operator":"EQUALS","value":"Apple"}]},"then":{"decision":"ACCEPT","premiumOverride":null,"premiumDelta":0.1,"stop":false}}',
    now (),
    now ()
  ),
  (
    '224ac066-0582-448a-a9eb-ed6ddc73b406',
    '4ca1c734-42b2-46b9-8710-b40800f89157', -- Global Shield Green
    'Teacher Union Pricing',
    'Teach Union agreed pricing.',
    'Teach Union agreed pricing.',
    9,
    true,
    '{"when":{"match":"ALL","conditions":[{"field":"occupation","operator":"EQUALS","value":"Teacher"}]},"then":{"decision":"ACCEPT","premiumOverride":5.99,"premiumDelta":null,"stop":true}}',
    now (),
    now ()
  )
ON CONFLICT (id) DO UPDATE
SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  reason = EXCLUDED.reason,
  priority = EXCLUDED.priority,
  active = EXCLUDED.active,
  rule_config = EXCLUDED.rule_config,
  updated_at = now ();