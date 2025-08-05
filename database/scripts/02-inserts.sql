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
  ('b8901234-8901-8901-8901-890123456789', 'Predio La Paloma', -33.234567, -57.890123),
  ('f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', 'Estancia La Nueva', -33.123456, -56.654321),
  ('e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', 'Campo El Progreso', -32.654321, -55.123456),
  ('d3a4b5c6-e7f8-4901-8e9d-8a7b6c5d4e3f', 'Predio Los Robles', -34.654321, -57.654321);

-- 3) Tags (a mix of active, retired, inactive; plus additional inactive tags)
INSERT INTO tags (id, status, tag_number, country_code, country_iso, ministry) VALUES
  -- initial five
  ('6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', 'active',   'UY00001', '00014', '858', 'MGAP UY'),
  ('0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', 'active',   'UY00002', '00014', '858', 'MGAP UY'),
  ('54ad4f1a-97b2-474f-b8dc-8829b893771d', 'active',   'UY00003', '00014', '858', 'MGAP UY'),
  ('15779937-6da1-41fb-b747-cb44d4b0004c', 'retired',  'UY00004', '00014', '858', 'MGAP UY'),
  ('3188ea06-27af-4817-9c72-863c77b8c377', 'inactive', 'UY00005', '00014', '858', 'MGAP UY'),
  -- additional inactive tags (for testing, unassigned)
  ('e260a815-23f1-4bc7-923d-c841a00952f8', 'inactive', 'UY00006', '00014', '858', 'MGAP UY'),
  ('4c45ab86-1dd7-4252-81a8-8d12e1b73e7a', 'inactive', 'UY00007', '00014', '858', 'MGAP UY'),
  ('e063814c-4472-46e9-8b39-13377b2dfcfe', 'inactive', 'UY00008', '00014', '858', 'MGAP UY'),
  ('dc078b0e-d34c-4c24-a2e4-946f4ed4c202', 'inactive', 'UY00009', '00014', '858', 'MGAP UY'),
  ('b3b5d992-00f3-4054-92a5-af34b9aac4df', 'inactive', 'UY00010', '00014', '858', 'MGAP UY'),
  ('a1b2c3d4-e5f6-4789-9a8b-7c6d5e4f3a2b', 'active',   'UY00011', '00014', '858', 'MGAP UY'),
  ('b2c3d4e5-f6a7-4890-8b9a-6d5e4f3a2b1c', 'inactive', 'UY00012', '00014', '858', 'MGAP UY'),
  ('c3d4e5f6-a7b8-4901-9a8b-5e4f3a2b1c2d', 'retired',  'UY00013', '00014', '858', 'MGAP UY'),
  ('d4e5f6a7-b8c9-4012-8b9a-4f3a2b1c2d3e', 'active',   'UY00014', '00014', '858', 'MGAP UY'),
  ('e5f6a7b8-c9d0-4123-9a8b-3a2b1c2d3e4f', 'inactive', 'UY00015', '00014', '858', 'MGAP UY'),
  ('f6a7b8c9-d0e1-4234-8b9a-2b1c2d3e4f5a', 'active',   'UY00016', '00014', '858', 'MGAP UY'),
  ('a7b8c9d0-e1f2-4345-9a8b-1c2d3e4f5a6b', 'inactive', 'UY00017', '00014', '858', 'MGAP UY'),
  ('b8c9d0e1-f2a3-4456-8b9a-0d3e4f5a6b7c', 'active',   'UY00018', '00014', '858', 'MGAP UY'),
  ('c9d0e1f2-a3b4-4567-9a8b-9e8d7c6b5a4f', 'retired',  'UY00019', '00014', '858', 'MGAP UY'),
  ('d0e1f2a3-b4c5-4678-8b9a-8d7c6b5a4f3e', 'active',   'UY00020', '00014', '858', 'MGAP UY');

-- 4) Users
INSERT INTO users (id, email, password_hash, role_id, created_at) VALUES
  ('de3d6619-7d68-45a6-80df-2d464b6716d4', 'admin@trazabilidad.uy',    crypt('admin123', gen_salt('bf')), 3, now()),
  ('100dc01b-7225-4893-b853-0c9bf1804bc4', 'operador@mgap.gub.uy',     crypt('opera123', gen_salt('bf')), 1, now()),
  ('26b12297-942a-451e-95bf-2d98f915c636', 'ganadero1@outlook.com',    crypt('gana123',  gen_salt('bf')), 2, now()),
  ('0c2bcc02-7a08-47be-9c79-28f17117d8fa', 'estanciero@hotmail.com',   crypt('estancia123',gen_salt('bf')), 2, now()),
  ('f8766922-4928-4144-b8a4-cef1978b4cd7', 'supervisor@trazabilidad.uy',crypt('super123', gen_salt('bf')), 3, now()),
  ('b1a8e1e2-1c2d-4e3f-8a4b-5c6d7e8f9a10', 'marti@mgap.gub.uy', crypt('user123', gen_salt('bf')), 1, now()),
  ('c2b9f2f3-2d3e-5f4a-9b5c-6d7e8f9a1b20', 'luis@mgap.gub.uy', crypt('user234', gen_salt('bf')), 1, now()),
  ('d3c0a3a4-3e4f-6a5b-0c6d-7e8f9a1b2c30', 'juana@mgap.gub.uy', crypt('user345', gen_salt('bf')), 1, now()),
  ('e4d1b4b5-4f5a-7b6c-1d7e-8f9a1b2c3d40', 'juan@mgap.gub.uy', crypt('user456', gen_salt('bf')), 1, now()),
  ('f5e2c5c6-5a6b-8c7d-2e8f-9a1b2c3d4e50', 'armando@trazabilidad.uy', crypt('user567', gen_salt('bf')), 3, now()),
  ('a6f3d6d7-6b7c-9d8e-3f9a-1b2c3d4e5f60', 'jmalnik@trazabilidad.uy', crypt('user678', gen_salt('bf')), 3, now());

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
  ('d1f81cef-8d4a-451e-9300-9883528c66b3','Holando',  '2022-01-12','de3d6619-7d68-45a6-80df-2d464b6716d4','c3456789-3456-3456-3456-345678901234',now(),now(),'alive'),
  ('46ab34e7-49df-48f7-acf1-b5685ddae95a','Jersey',   '2022-02-18','100dc01b-7225-4893-b853-0c9bf1804bc4','d4567890-4567-4567-4567-456789012345',now(),now(),'alive'),
  ('5747aef8-85ba-49dc-8db2-c1cf3cb4879d','Bradford', '2022-03-25','26b12297-942a-451e-95bf-2d98f915c636','e5678901-5678-5678-5678-567890123456',now(),now(),'alive'),
  ('3a1adf1e-9ed8-4aa1-9fd8-d613ece5c667','Criollo',  '2022-04-10','0c2bcc02-7a08-47be-9c79-28f17117d8fa','f6789012-6789-6789-6789-678901234567',now(),now(),'alive'),
  ('da7adbdb-fa48-4c6b-95f0-6df4119532d2','Senepol',  '2022-05-16','f8766922-4928-4144-b8a4-cef1978b4cd7','a7890123-7890-7890-7890-789012345678',now(),now(),'alive'),
  ('e1f2a3b4-c5d6-4789-9a8b-7c6d5e4f3a2b', 'Hereford', '2021-07-01', 'b1a8e1e2-1c2d-4e3f-8a4b-5c6d7e8f9a10', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', now(), now(), 'alive'),
  ('f2a3b4c5-d6e7-4890-8b9a-6d5e4f3a2b1c', 'Angus', '2020-09-15', 'c2b9f2f3-2d3e-5f4a-9b5c-6d7e8f9a1b20', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', now(), now(), 'alive'),
  ('a3b4c5d6-e7f8-4901-9a8b-5e4f3a2b1c2d', 'Holando', '2019-12-10', 'd3c0a3a4-3e4f-6a5b-0c6d-7e8f9a1b2c30', 'd3a4b5c6-e7f8-4901-8e9d-8a7b6c5d4e3f', now(), now(), 'alive'),
  ('b4c5d6e7-f8a9-4012-8b9a-4f3a2b1c2d3e', 'Jersey', '2022-02-20', 'e4d1b4b5-4f5a-7b6c-1d7e-8f9a1b2c3d40', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', now(), now(), 'alive'),
  ('c5d6e7f8-a9b0-4123-9a8b-3a2b1c2d3e4f', 'Braford', '2022-03-25', 'f5e2c5c6-5a6b-8c7d-2e8f-9a1b2c3d4e50', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', now(), now(), 'alive'),
  ('d6e7f8a9-b0c1-4234-8b9a-2b1c2d3e4f5a', 'Limousin', '2021-08-30', 'a6f3d6d7-6b7c-9d8e-3f9a-1b2c3d4e5f60', 'd3a4b5c6-e7f8-4901-8e9d-8a7b6c5d4e3f', now(), now(), 'alive'),
  ('e7f8a9b0-c1d2-4345-9a8b-1c2d3e4f5a6b', 'Charolais', '2020-11-18', 'b1a8e1e2-1c2d-4e3f-8a4b-5c6d7e8f9a10', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', now(), now(), 'alive'),
  ('f8a9b0c1-d2e3-4456-8b9a-0d3e4f5a6b7c', 'Shorthorn', '2021-10-12', 'c2b9f2f3-2d3e-5f4a-9b5c-6d7e8f9a1b20', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', now(), now(), 'alive'),
  ('a9b0c1d2-e3f4-4567-9a8b-9e8d7c6b5a4f', 'Simmental', '2022-05-01', 'd3c0a3a4-3e4f-6a5b-0c6d-7e8f9a1b2c30', 'd3a4b5c6-e7f8-4901-8e9d-8a7b6c5d4e3f', now(), now(), 'alive'),
  ('b0c1d2e3-f4a5-4678-8b9a-8d7c6b5a4f3e', 'Senepol', '2022-06-16', 'e4d1b4b5-4f5a-7b6c-1d7e-8f9a1b2c3d40', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', now(), now(), 'alive');

-- 6) Animal_Tag assignments for first five animals (al asignar, la tag debe estar activa)
INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date, unassignment_date) VALUES
  ('c11fedab-8c0a-4343-b342-272198f512cf', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1','6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', now(), NULL),
  ('1d599d97-2a80-4431-b884-62e9a7b117bc','7eb4d619-6c02-4f02-ab7a-3e302a74eff6','0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', now(), NULL),
  ('4598c3ae-c8ec-4bc9-8f94-062b88036473','a964bb80-32fc-46d0-b239-e03125535430','54ad4f1a-97b2-474f-b8dc-8829b893771d', now(), NULL),
  ('dc2c13d2-7121-4d66-a9e5-afbf5f35c290','62645b97-955e-49ea-891e-24b6ff9180ae','15779937-6da1-41fb-b747-cb44d4b0004c', now(), NULL),
  ('76eb8c02-4e88-422b-92ad-c3a1cc654368','8cfef1a6-77ed-4b17-ab30-176e88b8af37','3188ea06-27af-4817-9c72-863c77b8c377', now(), NULL),
  ('c1d2e3f4-a5b6-4789-9a8b-7c6d5e4f3a2b', 'e1f2a3b4-c5d6-4789-9a8b-7c6d5e4f3a2b', 'a1b2c3d4-e5f6-4789-9a8b-7c6d5e4f3a2b', now(), NULL),
  ('d2e3f4a5-b6c7-4890-8b9a-6d5e4f3a2b1c', 'f2a3b4c5-d6e7-4890-8b9a-6d5e4f3a2b1c', 'b2c3d4e5-f6a7-4890-8b9a-6d5e4f3a2b1c', now(), NULL),
  ('e3f4a5b6-c7d8-4901-9a8b-5e4f3a2b1c2d', 'a3b4c5d6-e7f8-4901-9a8b-5e4f3a2b1c2d', 'c3d4e5f6-a7b8-4901-9a8b-5e4f3a2b1c2d', now(), NULL),
  ('f4a5b6c7-d8e9-4012-8b9a-4f3a2b1c2d3e', 'b4c5d6e7-f8a9-4012-8b9a-4f3a2b1c2d3e', 'd4e5f6a7-b8c9-4012-8b9a-4f3a2b1c2d3e', now(), NULL),
  ('a5b6c7d8-e9f0-4123-9a8b-3a2b1c2d3e4f', 'c5d6e7f8-a9b0-4123-9a8b-3a2b1c2d3e4f', 'e5f6a7b8-c9d0-4123-9a8b-3a2b1c2d3e4f', now(), NULL),
  ('b6c7d8e9-f0a1-4234-8b9a-2b1c2d3e4f5a', 'd6e7f8a9-b0c1-4234-8b9a-2b1c2d3e4f5a', 'f6a7b8c9-d0e1-4234-8b9a-2b1c2d3e4f5a', now(), NULL),
  ('c7d8e9f0-a1b2-4345-9a8b-1c2d3e4f5a6b', 'e7f8a9b0-c1d2-4345-9a8b-1c2d3e4f5a6b', 'a7b8c9d0-e1f2-4345-9a8b-1c2d3e4f5a6b', now(), NULL),
  ('d8e9f0a1-b2c3-4456-8b9a-0d3e4f5a6b7c', 'f8a9b0c1-d2e3-4456-8b9a-0d3e4f5a6b7c', 'b8c9d0e1-f2a3-4456-8b9a-0d3e4f5a6b7c', now(), NULL),
  ('e9f0a1b2-c3d4-4567-9a8b-9e8d7c6b5a4f', 'a9b0c1d2-e3f4-4567-9a8b-9e8d7c6b5a4f', 'c9d0e1f2-a3b4-4567-9a8b-9e8d7c6b5a4f', now(), NULL),
  ('f0a1b2c3-d4e5-4678-8b9a-8d7c6b5a4f3e', 'b0c1d2e3-f4a5-4678-8b9a-8d7c6b5a4f3e', 'd0e1f2a3-b4c5-4678-8b9a-8d7c6b5a4f3e', now(), NULL);

-- Tipos de evento necesarios para los eventos
INSERT INTO event_type (id, name, description) VALUES
  (3, 'Weighing', 'Evento de pesaje de animales'),
  (4, 'Vaccination', 'Evento de vacunación de animales'),
  (7, 'Sale', 'Evento de venta de animales');

-- Events for weighings
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('b1e2c3d4-5f6a-4b7c-8d9e-0f1a2b3c4d5e', 3, now() - interval '20 days', 'Pesaje rutinario mensual', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('c2f3a4b5-6d7e-5c8b-9a0f-1b2c3d4e5f6a', 3, now() - interval '18 days', 'Control de peso post-vacunación', '100dc01b-7225-4893-b853-0c9bf1804bc4'),
  ('d3a4b5c6-7e8f-6d9c-0a1b-2c3d4e5f6a7b', 3, now() - interval '15 days', 'Pesaje pre-transporte', '26b12297-942a-451e-95bf-2d98f915c636'),
  ('e4b5c6d7-8f9a-7e0d-1b2c-3d4e5f6a7b8c', 3, now() - interval '12 days', 'Control veterinario mensual', '0c2bcc02-7a08-47be-9c79-28f17117d8fa'),
  ('f5c6d7e8-9a0b-8f1e-2c3d-4e5f6a7b8c9d', 3, now() - interval '10 days', 'Pesaje control crecimiento', 'f8766922-4928-4144-b8a4-cef1978b4cd7');

-- Events for vaccinations
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f', 4, now() - interval '30 days', 'Vacunación antiaftosa', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('b7e8f9a0-1c2d-0b3e-4f5a-6b7c8d9e0f1a', 4, now() - interval '28 days', 'Vacuna contra brucelosis', '100dc01b-7225-4893-b853-0c9bf1804bc4'),
  ('c8f9a0b1-2d3e-1c4f-5a6b-7c8d9e0f1a2b', 4, now() - interval '25 days', 'Vacunación IBR/BVD', '26b12297-942a-451e-95bf-2d98f915c636'),
  ('d9a0b1c2-3e4f-2d5a-6b7c-8d9e0f1a2b3c', 4, now() - interval '22 days', 'Refuerzo antiaftosa', '0c2bcc02-7a08-47be-9c79-28f17117d8fa'),
  ('e0b1c2d3-4f5a-3e6b-7c8d-9e0f1a2b3c4d', 4, now() - interval '20 days', 'Vacuna carbunco', 'f8766922-4928-4144-b8a4-cef1978b4cd7');

-- Events for sales
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('f1c2d3e4-5a6b-4c7d-8e9f-0a1b2c3d4e5f', 7, now() - interval '5 days', 'Venta a frigorífico', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('a2d3e4f5-6b7c-5d8e-9f0a-1b2c3d4e5f6a', 7, now() - interval '3 days', 'Venta directa consumidor', '100dc01b-7225-4893-b853-0c9bf1804bc4');

-- Animal-Event associations
INSERT INTO animal_event (id, event_id, animal_id) VALUES
  -- Weighing events
  ('b2e3c4d5-6f7a-5b8c-9d0e-1f2a3b4c5d6e', 'b1e2c3d4-5f6a-4b7c-8d9e-0f1a2b3c4d5e', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1'),
  ('c3f4a5b6-7d8e-6c9b-0a1f-2b3c4d5e6f7a', 'c2f3a4b5-6d7e-5c8b-9a0f-1b2c3d4e5f6a', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6'),
  ('d4a5b6c7-8e9f-7d0c-1a2b-3c4d5e6f7a8b', 'd3a4b5c6-7e8f-6d9c-0a1b-2c3d4e5f6a7b', 'a964bb80-32fc-46d0-b239-e03125535430'),
  ('e5b6c7d8-9f0a-8e1d-2b3c-4d5e6f7a8b9c', 'e4b5c6d7-8f9a-7e0d-1b2c-3d4e5f6a7b8c', '62645b97-955e-49ea-891e-24b6ff9180ae'),
  ('f6c7d8e9-0a1b-9f2e-3c4d-5e6f7a8b9c0d', 'f5c6d7e8-9a0b-8f1e-2c3d-4e5f6a7b8c9d', '8cfef1a6-77ed-4b17-ab30-176e88b8af37'),
  -- Vaccination events
  ('a7d8e9f0-1b2c-0a3d-4e5f-6a7b8c9d0e1f', 'a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1'),
  ('b8e9f0a1-2c3d-1b4e-5f6a-7b8c9d0e1f2a', 'b7e8f9a0-1c2d-0b3e-4f5a-6b7c8d9e0f1a', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6'),
  ('c9f0a1b2-3d4e-2c5f-6a7b-8c9d0e1f2a3b', 'c8f9a0b1-2d3e-1c4f-5a6b-7c8d9e0f1a2b', 'a964bb80-32fc-46d0-b239-e03125535430'),
  ('d0a1b2c3-4e5f-3d6a-7b8c-9d0e1f2a3b4c', 'd9a0b1c2-3e4f-2d5a-6b7c-8d9e0f1a2b3c', '62645b97-955e-49ea-891e-24b6ff9180ae'),
  ('e1b2c3d4-5f6a-4e7b-8c9d-0e1f2a3b4c5d', 'e0b1c2d3-4f5a-3e6b-7c8d-9e0f1a2b3c4d', '8cfef1a6-77ed-4b17-ab30-176e88b8af37'),
  -- Sale events
  ('f2c3d4e5-6a7b-5c8d-9e0f-1a2b3c4d5e6f', 'f1c2d3e4-5a6b-4c7d-8e9f-0a1b2c3d4e5f', 'c2716fad-ffce-4517-ad2e-7415cf80178a'),
  ('a3d4e5f6-7b8c-6d9e-0f1a-2b3c4d5e6f7a', 'a2d3e4f5-6b7c-5d8e-9f0a-1b2c3d4e5f6a', 'a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1');

-- Weighing details
INSERT INTO weightings (id, event_id, weight, unit) VALUES
  ('da7bb15f-92f6-4739-9420-5685e45c7caa', 'c2f3a4b5-6d7e-5c8b-9a0f-1b2c3d4e5f6a', 380.75, 'kg'),
  ('215ef315-9cf3-4c4a-be94-57b0752d1444', 'd3a4b5c6-7e8f-6d9c-0a1b-2c3d4e5f6a7b', 520.25, 'kg'),
  ('03b495b4-fc4b-4293-b1bc-0ecf31ae744d', 'e4b5c6d7-8f9a-7e0d-1b2c-3d4e5f6a7b8c', 395.80, 'kg'),
  ('5aabdff4-f579-4cfe-9b2d-dc3dff0708d6', 'f5c6d7e8-9a0b-8f1e-2c3d-4e5f6a7b8c9d', 425.60, 'kg');

-- Vaccination details
INSERT INTO vaccinations (id, event_id, vaccine, dosage, provider) VALUES
  ('b8cba824-68a8-4300-bef0-5d37f28d385a', 'a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f', 'Aftosa Oleosa', '2ml', 'Biogénesis Bagó'),
  ('0b952984-746f-4b87-a7c7-ad9061e99a61', 'b7e8f9a0-1c2d-0b3e-4f5a-6b7c8d9e0f1a', 'Brucelosis RB51', '1ml', 'Zoetis'),
  ('451fcda5-cdb7-4379-b7c9-b5e041fb52d9', 'c8f9a0b1-2d3e-1c4f-5a6b-7c8d9e0f1a2b', 'Respibov', '2ml', 'Biogénesis Bagó'),
  ('6250ddc4-779f-4779-8952-ad48761929b0', 'd9a0b1c2-3e4f-2d5a-6b7c-8d9e0f1a2b3c', 'Aftosa Oleosa Refuerzo', '2ml', 'Biogénesis Bagó'),
  ('247f9d0f-3408-4f1a-8ccb-dc0dbe91a89d', 'e0b1c2d3-4f5a-3e6b-7c8d-9e0f1a2b3c4d', 'Carbunco Bacteridiano', '1ml', 'Colorado'),
  ('b2c3d4e5-f6a7-4890-8b9a-6d5e4f3a2b1c', 'a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f', 'Aftosa', '2ml', 'Biogénesis'),
  ('e5f6a7b8-c9d0-4123-9a8b-3a2b1c2d3e4f', 'b7e8f9a0-1c2d-0b3e-4f5a-6b7c8d9e0f1a', 'Brucelosis', '1ml', 'Zoetis');

-- Sale details
INSERT INTO sales (id, event_id, buyer, price, currency) VALUES
  ('3d968525-2eb4-4daf-a148-956a026645c0', 'f1c2d3e4-5a6b-4c7d-8e9f-0a1b2c3d4e5f', 'Frigorífico Tacuarembó', 3250.00, 'USD'),
  ('341f316a-f0e7-40c8-8c6e-69fc1cbf30c6', 'a2d3e4f5-6b7c-5d8e-9f0a-1b2c3d4e5f6a', 'Carnicería El Buen Gusto', 2850.00, 'USD');

-- Transport records
INSERT INTO transports (id, animal_id, origin_land_id, destiny_land_id, date, details) VALUES
  ('a3028cba-47ba-4ffc-a5cf-0aa620f8c463', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1', 'a1234567-1234-1234-1234-123456789012', 'b2345678-2345-2345-2345-234567890123', now() - interval '15 days', 'Transporte para cambio de potrero'),
  ('e1f050fc-7f84-4efa-abd6-468de4cb5e0e', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6', 'b2345678-2345-2345-2345-234567890123', 'c3456789-3456-3456-3456-345678901234', now() - interval '12 days', 'Movimiento por sequía'),
  ('5511a145-7626-4198-97ea-6689d490b59f', 'a964bb80-32fc-46d0-b239-e03125535430', 'c3456789-3456-3456-3456-345678901234', 'd4567890-4567-4567-4567-456789012345', now() - interval '8 days', 'Cambio de establecimiento'),
  ('6cba63ea-0c86-4a03-bcdf-2f2a37912cba', '62645b97-955e-49ea-891e-24b6ff9180ae', 'd4567890-4567-4567-4567-456789012345', 'e5678901-5678-5678-5678-567890123456', now() - interval '5 days', 'Rotación de pastoreo'),
  ('95102f83-494f-459e-ab40-22a152f0c4c2', '8cfef1a6-77ed-4b17-ab30-176e88b8af37', 'e5678901-5678-5678-5678-567890123456', 'f6789012-6789-6789-6789-678901234567', now() - interval '3 days', 'Preparación pre-venta'),
  ('a4b5c6d7-e8f9-4901-9a8b-5e4f3a2b1c2d', 'e1f2a3b4-c5d6-4789-9a8b-7c6d5e4f3a2b', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', now() - interval '2 days', 'Traslado usuario1'),
  ('b5c6d7e8-f9a0-4012-8b9a-4f3a2b1c2d3e', 'f2a3b4c5-d6e7-4890-8b9a-6d5e4f3a2b1c', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', 'd3a4b5c6-e7f8-4901-8e9d-8a7b6c5d4e3f', now() - interval '1 days', 'Traslado usuario2');

-- Animal history records (audit trail)
INSERT INTO animal_history (id, animal_id, modified, old_value, new_value, modified_by, modification_date) VALUES
  ('1bf92745-ffe6-43b8-94ba-57c12dbde3b5', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1', 'land_id', 'a1234567-1234-1234-1234-123456789012', 'b2345678-2345-2345-2345-234567890123', 'de3d6619-7d68-45a6-80df-2d464b6716d4', now() - interval '15 days'),
  ('32bebf98-399e-4e59-ba53-ea7fbcf8a49f', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6', 'land_id', 'b2345678-2345-2345-2345-234567890123', 'c3456789-3456-3456-3456-345678901234', '100dc01b-7225-4893-b853-0c9bf1804bc4', now() - interval '12 days'),
  ('c44a2752-4f07-4e80-9d19-6acff3f0ec05', 'a964bb80-32fc-46d0-b239-e03125535430', 'land_id', 'c3456789-3456-3456-3456-345678901234', 'd4567890-4567-4567-4567-456789012345', '26b12297-942a-451e-95bf-2d98f915c636', now() - interval '8 days'),
  ('74a37e8c-26a2-4dda-9ba8-14648384093f', 'c2716fad-ffce-4517-ad2e-7415cf80178a', 'status', 'alive', 'deceased', 'de3d6619-7d68-45a6-80df-2d464b6716d4', now() - interval '5 days'),
  ('5804a890-2be5-49d9-a7eb-3b8ea7c4be12', 'a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1', 'status', 'alive', 'deceased', '100dc01b-7225-4893-b853-0c9bf1804bc4', now() - interval '3 days'),
  ('a5b6c7d8-e9f0-4123-9a8b-3a2b1c2d3e4f', 'e1f2a3b4-c5d6-4789-9a8b-7c6d5e4f3a2b', 'land_id', 'f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d', 'e2f3a4b5-c6d7-4890-9d8e-7f6a5b4c3d2e', 'b1a8e1e2-1c2d-4e3f-8a4b-5c6d7e8f9a10', now() - interval '2 days'),
  ('b6c7d8e9-f0a1-4234-8b9a-2b1c2d3e4f5a', 'f2a3b4c5-d6e7-4890-8b9a-6d5e4f3a2b1c', 'status', 'alive', 'deceased', 'c2b9f2f3-2d3e-5f4a-9b5c-6d7e8f9a1b20', now() - interval '1 days');
