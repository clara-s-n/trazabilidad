-- 1) Roles (static, only once)
INSERT INTO roles (id, name, description) VALUES
  (1, 'Operador Autorizado', 'Usuario autorizado por MGAP'),
  (2, 'Usuario Consulta',   'Usuario con permisos de consulta'),
  (3, 'Administrador',      'Administrador del sistema');

-- 2) Lands (replace any previous lands inserts with these realistic ones)
INSERT INTO lands (id, name, latitude, longitude) VALUES
  ('43666c09-a0b0-4b6b-9558-e44b50a25d57', 'Estancia San José', -34.478611, -56.892778),
  ('bf52757b-7a5a-4748-b78f-459471979493', 'Predio La Esperanza', -33.245667, -57.123456),
  ('584630da-cc70-40dd-9599-aa539d788894', 'Establecimiento El Trébol', -32.876543, -55.987654),
  ('362d303b-5994-419c-a884-1656f074db63', 'Campo Las Mercedes', -34.123456, -56.456789),
  ('9535a62f-310e-4a39-9a8d-c01f4f53cb07', 'Estancia Don Carlos', -33.789012, -57.345678),
  ('a1234567-1234-1234-1234-123456789012', 'Estancia El Ceibo', -34.567890, -56.123456),
  ('b2345678-2345-2345-2345-234567890123', 'Campo Santa Rosa', -33.678901, -57.234567),
  ('c3456789-3456-3456-3456-345678901234', 'Establecimiento Los Alamos', -32.789012, -55.345678),
  ('d4567890-4567-4567-4567-456789012345', 'Predio Las Flores', -34.890123, -56.456789),
  ('e5678901-5678-5678-5678-567890123456', 'Estancia Bella Vista', -33.901234, -57.567890),
  ('f6789012-6789-6789-6789-678901234567', 'Campo Los Pinos', -32.012345, -55.678901),
  ('a7890123-7890-7890-7890-789012345678', 'Establecimiento San Pedro', -34.123456, -56.789012),
  ('b8901234-8901-8901-8901-890123456789', 'Predio La Paloma', -33.234567, -57.890123);

-- 3) Tags (a mix of active, retired, inactive; plus additional inactive tags)
INSERT INTO tags (id, status, tag_number, country_code, country_iso, ministry) VALUES
  -- initial five
  ('6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', 'active',   'UY00001', '00014', '858', 'MGAP UY'),
  ('0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', 'active',   'UY00002', '00014', '858', 'MGAP UY'),
  ('54ad4f1a-97b2-474f-b8dc-8829b893771d', 'active',   'UY00003', '00014', '858', 'MGAP UY'),
  ('15779937-6da1-41fb-b747-cb44d4b0004c', 'retired',  'UY00004', '00014', '858', 'MGAP UY'),
  ('3188ea06-27af-4817-9c72-863c77b8c377', 'inactive', 'UY00005', '00014', '858', 'MGAP UY'),
  -- additional inactive tags (for testing, unassigned)
  ('tag00006-0000-0000-0000-000000000006', 'inactive', 'UY00006', '00014', '858', 'MGAP UY'),
  ('tag00007-0000-0000-0000-000000000007', 'inactive', 'UY00007', '00014', '858', 'MGAP UY'),
  ('tag00008-0000-0000-0000-000000000008', 'inactive', 'UY00008', '00014', '858', 'MGAP UY'),
  ('tag00009-0000-0000-0000-000000000009', 'inactive', 'UY00009', '00014', '858', 'MGAP UY'),
  ('tag00010-0000-0000-0000-000000000010', 'inactive', 'UY00010', '00014', '858', 'MGAP UY');

-- 4) Users
INSERT INTO users (id, email, password_hash, role_id, created_at) VALUES
  ('de3d6619-7d68-45a6-80df-2d464b6716d4', 'admin@trazabilidad.uy',    crypt('admin123', gen_salt('bf')), 3, now()),
  ('100dc01b-7225-4893-b853-0c9bf1804bc4', 'operador@mgap.gub.uy',     crypt('opera123', gen_salt('bf')), 1, now()),
  ('26b12297-942a-451e-95bf-2d98f915c636', 'ganadero1@outlook.com',    crypt('gana123',  gen_salt('bf')), 2, now()),
  ('0c2bcc02-7a08-47be-9c79-28f17117d8fa', 'estanciero@hotmail.com',   crypt('estancia123',gen_salt('bf')), 2, now()),
  ('f8766922-4928-4144-b8a4-cef1978b4cd7', 'supervisor@trazabilidad.uy',crypt('super123', gen_salt('bf')), 3, now());

-- 5) Animals (initial eight + five additional)
INSERT INTO animals (id, breed, birth_date, owner_id, land_id, created_at, updated_at, status) VALUES
  -- initial eight
  ('aaab3d4c-5623-491e-a666-f2e9c1d62cf1','Hereford',          '2021-03-15','de3d6619-7d68-45a6-80df-2d464b6716d4','43666c09-a0b0-4b6b-9558-e44b50a25d57',now(),now(),'alive'),
  ('7eb4d619-6c02-4f02-ab7a-3e302a74eff6','Aberdeen Angus',    '2020-08-22','100dc01b-7225-4893-b853-0c9bf1804bc4','43666c09-a0b0-4b6b-9558-e44b50a25d57',now(),now(),'alive'),
  ('a964bb80-32fc-46d0-b239-e03125535430','Holando',           '2019-11-10','26b12297-942a-451e-95bf-2d98f915c636','bf52757b-7a5a-4748-b78f-459471979493',now(),now(),'alive'),
  ('62645b97-955e-49ea-891e-24b6ff9180ae','Braford',           '2022-01-05','0c2bcc02-7a08-47be-9c79-28f17117d8fa','bf52757b-7a5a-4748-b78f-459471979493',now(),now(),'alive'),
  ('8cfef1a6-77ed-4b17-ab30-176e88b8af37','Limousin',          '2021-06-30','f8766922-4928-4144-b8a4-cef1978b4cd7','584630da-cc70-40dd-9599-aa539d788894',now(),now(),'alive'),
  ('c2716fad-ffce-4517-ad2e-7415cf80178a','Charolais',         '2020-12-18','de3d6619-7d68-45a6-80df-2d464b6716d4','362d303b-5994-419c-a884-1656f074db63',now(),now(),'alive'),
  ('a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1','Shorthorn',         '2021-09-12','26b12297-942a-451e-95bf-2d98f915c636','9535a62f-310e-4a39-9a8d-c01f4f53cb07',now(),now(),'alive'),
  ('8f31d0be-d956-4b51-b588-8658f64388a1','Simmental',         '2022-04-25','0c2bcc02-7a08-47be-9c79-28f17117d8fa','9535a62f-310e-4a39-9a8d-c01f4f53cb07',now(),now(),'alive'),
  -- five additional (no tags assigned)
  ('animal11-0000-0000-0000-000000000011','Holando',  '2022-01-12','de3d6619-7d68-45a6-80df-2d464b6716d4','c3456789-3456-3456-3456-345678901234',now(),now(),'alive'),
  ('animal12-0000-0000-0000-000000000012','Jersey',   '2022-02-18','100dc01b-7225-4893-b853-0c9bf1804bc4','d4567890-4567-4567-4567-456789012345',now(),now(),'alive'),
  ('animal13-0000-0000-0000-000000000013','Bradford', '2022-03-25','26b12297-942a-451e-95bf-2d98f915c636','e5678901-5678-5678-5678-567890123456',now(),now(),'alive'),
  ('animal14-0000-0000-0000-000000000014','Criollo',  '2022-04-10','0c2bcc02-7a08-47be-9c79-28f17117d8fa','f6789012-6789-6789-6789-678901234567',now(),now(),'alive'),
  ('animal15-0000-0000-0000-000000000015','Senepol',  '2022-05-16','f8766922-4928-4144-b8a4-cef1978b4cd7','a7890123-7890-7890-7890-789012345678',now(),now(),'alive');

-- 6) Animal_Tag assignments for first five animals (will activate those tags)
INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date, unassignment_date) VALUES
  ('c11fedab-8c0a-4343-b342-272198f512cf', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1','6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', now(), NULL),
  ('1d599d97-2a80-4431-b884-62e9a7b117bc','7eb4d619-6c02-4f02-ab7a-3e302a74eff6','0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', now(), NULL),
  ('4598c3ae-c8ec-4bc9-8f94-062b88036473','a964bb80-32fc-46d0-b239-e03125535430','54ad4f1a-97b2-474f-b8dc-8829b893771d', now(), NULL),
  ('dc2c13d2-7121-4d66-a9e5-afbf5f35c290','62645b97-955e-49ea-891e-24b6ff9180ae','15779937-6da1-41fb-b747-cb44d4b0004c', now(), NULL),
  ('76eb8c02-4e88-422b-92ad-c3a1cc654368','8cfef1a6-77ed-4b17-ab30-176e88b8af37','3188ea06-27af-4817-9c72-863c77b8c377', now(), NULL);

-- Activate those tags
UPDATE tags
  SET status = 'active'
  WHERE id IN (
    '6ba0b76d-cc01-4d91-8274-6a558b2b7d7b',
    '0f6d8e7e-6e6e-4c9a-ba3e-df063906d786',
    '54ad4f1a-97b2-474f-b8dc-8829b893771d',
    '15779937-6da1-41fb-b747-cb44d4b0004c',
    '3188ea06-27af-4817-9c72-863c77b8c377'
  );


-- Events for weighings
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('event001-0000-0000-0000-000000000001', 3, now() - interval '20 days', 'Pesaje rutinario mensual', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('event002-0000-0000-0000-000000000002', 3, now() - interval '18 days', 'Control de peso post-vacunación', '100dc01b-7225-4893-b853-0c9bf1804bc4'),
  ('event003-0000-0000-0000-000000000003', 3, now() - interval '15 days', 'Pesaje pre-transporte', '26b12297-942a-451e-95bf-2d98f915c636'),
  ('event004-0000-0000-0000-000000000004', 3, now() - interval '12 days', 'Control veterinario mensual', '0c2bcc02-7a08-47be-9c79-28f17117d8fa'),
  ('event005-0000-0000-0000-000000000005', 3, now() - interval '10 days', 'Pesaje control crecimiento', 'f8766922-4928-4144-b8a4-cef1978b4cd7');

-- Events for vaccinations
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('event006-0000-0000-0000-000000000006', 4, now() - interval '30 days', 'Vacunación antiaftosa', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('event007-0000-0000-0000-000000000007', 4, now() - interval '28 days', 'Vacuna contra brucelosis', '100dc01b-7225-4893-b853-0c9bf1804bc4'),
  ('event008-0000-0000-0000-000000000008', 4, now() - interval '25 days', 'Vacunación IBR/BVD', '26b12297-942a-451e-95bf-2d98f915c636'),
  ('event009-0000-0000-0000-000000000009', 4, now() - interval '22 days', 'Refuerzo antiaftosa', '0c2bcc02-7a08-47be-9c79-28f17117d8fa'),
  ('event010-0000-0000-0000-000000000010', 4, now() - interval '20 days', 'Vacuna carbunco', 'f8766922-4928-4144-b8a4-cef1978b4cd7');

-- Events for sales
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('event011-0000-0000-0000-000000000011', 7, now() - interval '5 days', 'Venta a frigorífico', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('event012-0000-0000-0000-000000000012', 7, now() - interval '3 days', 'Venta directa consumidor', '100dc01b-7225-4893-b853-0c9bf1804bc4');

-- Animal-Event associations
INSERT INTO animal_event (id, event_id, animal_id) VALUES
  -- Weighing events
  ('ae000001-0000-0000-0000-000000000001', 'event001-0000-0000-0000-000000000001', 'animal01-0000-0000-0000-000000000001'),
  ('ae000002-0000-0000-0000-000000000002', 'event002-0000-0000-0000-000000000002', 'animal02-0000-0000-0000-000000000002'),
  ('ae000003-0000-0000-0000-000000000003', 'event003-0000-0000-0000-000000000003', 'animal03-0000-0000-0000-000000000003'),
  ('ae000004-0000-0000-0000-000000000004', 'event004-0000-0000-0000-000000000004', 'animal04-0000-0000-0000-000000000004'),
  ('ae000005-0000-0000-0000-000000000005', 'event005-0000-0000-0000-000000000005', 'animal05-0000-0000-0000-000000000005'),
  
  -- Vaccination events
  ('ae000006-0000-0000-0000-000000000006', 'event006-0000-0000-0000-000000000006', 'animal01-0000-0000-0000-000000000001'),
  ('ae000007-0000-0000-0000-000000000007', 'event007-0000-0000-0000-000000000007', 'animal02-0000-0000-0000-000000000002'),
  ('ae000008-0000-0000-0000-000000000008', 'event008-0000-0000-0000-000000000008', 'animal03-0000-0000-0000-000000000003'),
  ('ae000009-0000-0000-0000-000000000009', 'event009-0000-0000-0000-000000000009', 'animal04-0000-0000-0000-000000000004'),
  ('ae000010-0000-0000-0000-000000000010', 'event010-0000-0000-0000-000000000010', 'animal05-0000-0000-0000-000000000005'),
  
  -- Sale events
  ('ae000011-0000-0000-0000-000000000011', 'event011-0000-0000-0000-000000000011', 'animal06-0000-0000-0000-000000000006'),
  ('ae000012-0000-0000-0000-000000000012', 'event012-0000-0000-0000-000000000012', 'animal07-0000-0000-0000-000000000007');

-- Weighing details
INSERT INTO weightings (id, event_id, weight, unit) VALUES
  ('weight01-0000-0000-0000-000000000001', 'event001-0000-0000-0000-000000000001', 450.50, 'kg'),
  ('weight02-0000-0000-0000-000000000002', 'event002-0000-0000-0000-000000000002', 380.75, 'kg'),
  ('weight03-0000-0000-0000-000000000003', 'event003-0000-0000-0000-000000000003', 520.25, 'kg'),
  ('weight04-0000-0000-0000-000000000004', 'event004-0000-0000-0000-000000000004', 395.80, 'kg'),
  ('weight05-0000-0000-0000-000000000005', 'event005-0000-0000-0000-000000000005', 425.60, 'kg');

-- Vaccination details
INSERT INTO vaccinations (id, event_id, vaccine, dosage, provider) VALUES
  ('vacc0001-0000-0000-0000-000000000001', 'event006-0000-0000-0000-000000000006', 'Aftosa Oleosa', '2ml', 'Biogénesis Bagó'),
  ('vacc0002-0000-0000-0000-000000000002', 'event007-0000-0000-0000-000000000007', 'Brucelosis RB51', '1ml', 'Zoetis'),
  ('vacc0003-0000-0000-0000-000000000003', 'event008-0000-0000-0000-000000000008', 'Respibov', '2ml', 'Biogénesis Bagó'),
  ('vacc0004-0000-0000-0000-000000000004', 'event009-0000-0000-0000-000000000009', 'Aftosa Oleosa Refuerzo', '2ml', 'Biogénesis Bagó'),
  ('vacc0005-0000-0000-0000-000000000005', 'event010-0000-0000-0000-000000000010', 'Carbunco Bacteridiano', '1ml', 'Colorado');

-- Sale details
INSERT INTO sales (id, event_id, buyer, price, currency) VALUES
  ('sale0001-0000-0000-0000-000000000001', 'event011-0000-0000-0000-000000000011', 'Frigorífico Tacuarembó', 3250.00, 'USD'),
  ('sale0002-0000-0000-0000-000000000002', 'event012-0000-0000-0000-000000000012', 'Carnicería El Buen Gusto', 2850.00, 'USD');

-- Transport records
INSERT INTO transports (id, animal_id, origin_land_id, destiny_land_id, date, details) VALUES
  ('trans001-0000-0000-0000-000000000001', 'animal01-0000-0000-0000-000000000001', 'a1234567-1234-1234-1234-123456789012', 'b2345678-2345-2345-2345-234567890123', now() - interval '15 days', 'Transporte para cambio de potrero'),
  ('trans002-0000-0000-0000-000000000002', 'animal02-0000-0000-0000-000000000002', 'b2345678-2345-2345-2345-234567890123', 'c3456789-3456-3456-3456-345678901234', now() - interval '12 days', 'Movimiento por sequía'),
  ('trans003-0000-0000-0000-000000000003', 'animal03-0000-0000-0000-000000000003', 'c3456789-3456-3456-3456-345678901234', 'd4567890-4567-4567-4567-456789012345', now() - interval '8 days', 'Cambio de establecimiento'),
  ('trans004-0000-0000-0000-000000000004', 'animal04-0000-0000-0000-000000000004', 'd4567890-4567-4567-4567-456789012345', 'e5678901-5678-5678-5678-567890123456', now() - interval '5 days', 'Rotación de pastoreo'),
  ('trans005-0000-0000-0000-000000000005', 'animal05-0000-0000-0000-000000000005', 'e5678901-5678-5678-5678-567890123456', 'f6789012-6789-6789-6789-678901234567', now() - interval '3 days', 'Preparación pre-venta');

-- Animal history records (audit trail)
INSERT INTO animal_history (id, animal_id, modified, old_value, new_value, modified_by, modification_date) VALUES
  ('hist0001-0000-0000-0000-000000000001', 'animal01-0000-0000-0000-000000000001', 'land_id', 'a1234567-1234-1234-1234-123456789012', 'b2345678-2345-2345-2345-234567890123', 'de3d6619-7d68-45a6-80df-2d464b6716d4', now() - interval '15 days'),
  ('hist0002-0000-0000-0000-000000000002', 'animal02-0000-0000-0000-000000000002', 'land_id', 'b2345678-2345-2345-2345-234567890123', 'c3456789-3456-3456-3456-345678901234', '100dc01b-7225-4893-b853-0c9bf1804bc4', now() - interval '12 days'),
  ('hist0003-0000-0000-0000-000000000003', 'animal03-0000-0000-0000-000000000003', 'land_id', 'c3456789-3456-3456-3456-345678901234', 'd4567890-4567-4567-4567-456789012345', '26b12297-942a-451e-95bf-2d98f915c636', now() - interval '8 days'),
  ('hist0004-0000-0000-0000-000000000004', 'animal06-0000-0000-0000-000000000006', 'status', 'alive', 'deceased', 'de3d6619-7d68-45a6-80df-2d464b6716d4', now() - interval '5 days'),
  ('hist0005-0000-0000-0000-000000000005', 'animal07-0000-0000-0000-000000000007', 'status', 'alive', 'deceased', '100dc01b-7225-4893-b853-0c9bf1804bc4', now() - interval '3 days');

-- Summary of what this script creates:
-- - 8 additional lands (properties)
-- - 20 additional tags (10 assigned, 10 unassigned)
-- - 15 additional animals (10 with tags, 5 without tags)
-- - 10 animal-tag assignments (making those tags 'active')
-- - 12 events (5 weighings, 5 vaccinations, 2 sales)
-- - 12 animal-event associations
-- - 5 weighing records
-- - 5 vaccination records  
-- - 2 sale records
-- - 5 transport records
-- - 5 animal history records

-- Total new records: 8 + 20 + 15 + 10 + 12 + 12 + 5 + 5 + 2 + 5 + 5 = 99 records
