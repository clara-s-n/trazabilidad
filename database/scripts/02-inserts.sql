-- 1) Roles (estáticos)
INSERT INTO roles (id, name, description) VALUES
  (1, 'Operador Autorizado', 'Usuario autorizado por MGAP'),
  (2, 'Usuario Consulta',   'Usuario con permisos de consulta'),
  (3, 'Administrador',      'Administrador del sistema');

-- 2) Lands (Predios con nombres más realistas)
INSERT INTO lands (id, name, latitude, longitude) VALUES
  ('43666c09-a0b0-4b6b-9558-e44b50a25d57', 'Estancia San José', -34.478611, -56.892778),
  ('bf52757b-7a5a-4748-b78f-459471979493', 'Predio La Esperanza', -33.245667, -57.123456),
  ('584630da-cc70-40dd-9599-aa539d788894', 'Establecimiento El Trébol', -32.876543, -55.987654),
  ('362d303b-5994-419c-a884-1656f074db63', 'Campo Las Mercedes', -34.123456, -56.456789),
  ('9535a62f-310e-4a39-9a8d-c01f4f53cb07', 'Estancia Don Carlos', -33.789012, -57.345678);

-- 3) Tags (Reduciendo cantidad para mejor testing)
INSERT INTO tags (id, status, tag_number, country_code, country_iso, ministry) VALUES
  ('6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', 'active', 'UY00001', '00014', '858', 'MGAP UY'),
  ('0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', 'active', 'UY00002', '00014', '858', 'MGAP UY'),
  ('54ad4f1a-97b2-474f-b8dc-8829b893771d', 'active', 'UY00003', '00014', '858', 'MGAP UY'),
  ('15779937-6da1-41fb-b747-cb44d4b0004c', 'retired', 'UY00004', '00014', '858', 'MGAP UY'),
  ('3188ea06-27af-4817-9c72-863c77b8c377', 'inactive', 'UY00005', '00014', '858', 'MGAP UY');

-- 4) Users (Usuarios con datos más realistas)
INSERT INTO users (id, email, password_hash, role_id, created_at) VALUES
  ('de3d6619-7d68-45a6-80df-2d464b6716d4', 'admin@trazabilidad.uy', crypt('admin123', gen_salt('bf')), 3, now()),
  ('100dc01b-7225-4893-b853-0c9bf1804bc4', 'operador@mgap.gub.uy', crypt('opera123', gen_salt('bf')), 1, now()),
  ('26b12297-942a-451e-95bf-2d98f915c636', 'ganadero1@outlook.com', crypt('gana123', gen_salt('bf')), 2, now()),
  ('0c2bcc02-7a08-47be-9c79-28f17117d8fa', 'estanciero@hotmail.com', crypt('estancia123', gen_salt('bf')), 2, now()),
  ('f8766922-4928-4144-b8a4-cef1978b4cd7', 'supervisor@trazabilidad.uy', crypt('super123', gen_salt('bf')), 3, now());

-- 5) Animals (Animales con razas realistas uruguayas)
INSERT INTO animals (id, breed, birth_date, owner_id, land_id, created_at, updated_at, status) VALUES
  ('aaab3d4c-5623-491e-a666-f2e9c1d62cf1', 'Hereford', '2021-03-15', 'de3d6619-7d68-45a6-80df-2d464b6716d4', '43666c09-a0b0-4b6b-9558-e44b50a25d57', now(), now(), 'alive'),
  ('7eb4d619-6c02-4f02-ab7a-3e302a74eff6', 'Aberdeen Angus', '2020-08-22', '100dc01b-7225-4893-b853-0c9bf1804bc4', '43666c09-a0b0-4b6b-9558-e44b50a25d57', now(), now(), 'alive'),
  ('a964bb80-32fc-46d0-b239-e03125535430', 'Holando', '2019-11-10', '26b12297-942a-451e-95bf-2d98f915c636', 'bf52757b-7a5a-4748-b78f-459471979493', now(), now(), 'alive'),
  ('62645b97-955e-49ea-891e-24b6ff9180ae', 'Braford', '2022-01-05', '0c2bcc02-7a08-47be-9c79-28f17117d8fa', 'bf52757b-7a5a-4748-b78f-459471979493', now(), now(), 'alive'),
  ('8cfef1a6-77ed-4b17-ab30-176e88b8af37', 'Limousin', '2021-06-30', 'f8766922-4928-4144-b8a4-cef1978b4cd7', '584630da-cc70-40dd-9599-aa539d788894', now(), now(), 'alive'),
  ('c2716fad-ffce-4517-ad2e-7415cf80178a', 'Charolais', '2020-12-18', 'de3d6619-7d68-45a6-80df-2d464b6716d4', '362d303b-5994-419c-a884-1656f074db63', now(), now(), 'alive'),
  ('a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1', 'Shorthorn', '2021-09-12', '26b12297-942a-451e-95bf-2d98f915c636', '9535a62f-310e-4a39-9a8d-c01f4f53cb07', now(), now(), 'alive'),
  ('8f31d0be-d956-4b51-b588-8658f64388a1', 'Simmental', '2022-04-25', '0c2bcc02-7a08-47be-9c79-28f17117d8fa', '9535a62f-310e-4a39-9a8d-c01f4f53cb07', now(), now(), 'alive');

-- 6) Animal_Tag (Asignaciones básicas, NO DUPLICADOS)
INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date, unassignment_date) VALUES
  ('c11fedab-8c0a-4343-b342-272198f512cf', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1', '6ba0b76d-cc01-4d91-8274-6a558b2b7d7b', now(), NULL),
  ('1d599d97-2a80-4431-b884-62e9a7b117bc', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6', '0f6d8e7e-6e6e-4c9a-ba3e-df063906d786', now(), NULL),
  ('4598c3ae-c8ec-4bc9-8f94-062b88036473', 'a964bb80-32fc-46d0-b239-e03125535430', '54ad4f1a-97b2-474f-b8dc-8829b893771d', now(), NULL),
  ('dc2c13d2-7121-4d66-a9e5-afbf5f35c290', '62645b97-955e-49ea-891e-24b6ff9180ae', '15779937-6da1-41fb-b747-cb44d4b0004c', now(), NULL),
  ('76eb8c02-4e88-422b-92ad-c3a1cc654368', '8cfef1a6-77ed-4b17-ab30-176e88b8af37', '3188ea06-27af-4817-9c72-863c77b8c377', now(), NULL);

-- 7) Transports
INSERT INTO transports (id, animal_id, origin_land_id, destiny_land_id, date, details) VALUES
  ('9086e832-2277-4447-aeaf-ad75f1337321', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1', '43666c09-a0b0-4b6b-9558-e44b50a25d57', 'bf52757b-7a5a-4748-b78f-459471979493', now(), 'Transporte 1'),
  ('0d5ad686-9046-4468-afdb-b18751e37989', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6', 'bf52757b-7a5a-4748-b78f-459471979493', '584630da-cc70-40dd-9599-aa539d788894', now(), 'Transporte 2'),
  ('53f01e70-fcfb-4adb-ba91-c973c7f7f224', 'a964bb80-32fc-46d0-b239-e03125535430', '584630da-cc70-40dd-9599-aa539d788894', '362d303b-5994-419c-a884-1656f074db63', now(), 'Transporte 3'),
  ('6ce45e8a-7ad5-4769-9d9c-d4d896eebb2e', '62645b97-955e-49ea-891e-24b6ff9180ae', '362d303b-5994-419c-a884-1656f074db63', '9535a62f-310e-4a39-9a8d-c01f4f53cb07', now(), 'Transporte 4'),
  ('bfc730e6-c700-4bd9-a1b3-4c98efa97f19', '8cfef1a6-77ed-4b17-ab30-176e88b8af37', '9535a62f-310e-4a39-9a8d-c01f4f53cb07', '584630da-cc70-40dd-9599-aa539d788894', now(), 'Transporte 5');

-- 8) Event Types

-- 8) Event Types
INSERT INTO event_type (name, description) VALUES
  ('Birth',            'Registro de nacimiento'),
  ('Sale',             'Venta de animal'),
  ('Vaccination',      'Aplicación de vacuna'),
  ('Weighing',         'Registración de peso'),
  ('Transport',        'Movimiento entre campos'),
  ('Tag Assignment',   'Asignación de tag'),
  ('Tag Unassignment', 'Desasignación de tag'),
  ('Health Check',     'Control sanitario'),
  ('Inspection',       'Inspección técnica'),
  ('Retirement',       'Retiro del sistema');

-- 9) Events
INSERT INTO events (id, event_type, date, comments, created_by) VALUES
  ('598ce3b2-3510-4b33-a50e-25c519586bff', 2, now(), 'Evento 1', 'de3d6619-7d68-45a6-80df-2d464b6716d4'),
  ('4c5bed42-747b-45bb-8174-d5af0c3910ea', 3, now(), 'Evento 2', '100dc01b-7225-4893-b853-0c9bf1804bc4'),
  ('e2438264-047d-4966-85d4-a6f38564491f', 4, now(), 'Evento 3', '26b12297-942a-451e-95bf-2d98f915c636'),
  ('bd1782f7-bff0-4332-8251-9ef0d219c708', 5, now(), 'Evento 4', '0c2bcc02-7a08-47be-9c79-28f17117d8fa'),
  ('9130db44-0adc-43ec-9176-34c4d8fa1b5f', 6, now(), 'Evento 5', 'f8766922-4928-4144-b8a4-cef1978b4cd7');

-- 10) Animal_Event
INSERT INTO animal_event (id, event_id, animal_id) VALUES
  ('74ac7dab-91a6-4ff2-9af3-1fdb52a8ddd7', '598ce3b2-3510-4b33-a50e-25c519586bff', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1'),
  ('a126209a-d4fb-4342-9412-b19350204384', '4c5bed42-747b-45bb-8174-d5af0c3910ea', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6'),
  ('f4f42f65-fbea-4adf-8922-b7e0f0883559', 'e2438264-047d-4966-85d4-a6f38564491f', 'a964bb80-32fc-46d0-b239-e03125535430'),
  ('13cdd995-e751-438a-b7bb-ce4c80a8c5f1', 'bd1782f7-bff0-4332-8251-9ef0d219c708', '62645b97-955e-49ea-891e-24b6ff9180ae'),
  ('fd7d40a4-18a7-45de-a2bc-94346c19a730', '9130db44-0adc-43ec-9176-34c4d8fa1b5f', '8cfef1a6-77ed-4b17-ab30-176e88b8af37');

-- 11) Weightings
INSERT INTO weightings (id, event_id, weight, unit) VALUES
  ('d6c2065a-cacb-4f65-a581-262f3ef6d2e4', '598ce3b2-3510-4b33-a50e-25c519586bff', 484.97, 'kg'),
  ('f81b71c4-7ca2-481e-9fbf-ac795f3481fb', '4c5bed42-747b-45bb-8174-d5af0c3910ea', 264.65, 'kg'),
  ('5888b7c6-964e-44b5-a11b-bc0c8a9a358b', 'e2438264-047d-4966-85d4-a6f38564491f', 439.39, 'kg'),
  ('679098c8-c5eb-48a1-983c-157d0ee09787', 'bd1782f7-bff0-4332-8251-9ef0d219c708', 167.22, 'kg'),
  ('1c7504a6-0482-454c-931a-7eb50463890e', '9130db44-0adc-43ec-9176-34c4d8fa1b5f', 412.26, 'kg');

-- 12) Sales
INSERT INTO sales (id, event_id, buyer, price, currency) VALUES
  ('15c9a868-70b1-4988-86c9-69076b56a4ad', '598ce3b2-3510-4b33-a50e-25c519586bff', 'Buyer 1', 4840.95, 'USD'),
  ('51791489-a898-49a3-8bd8-d45ab75fd2d0', '4c5bed42-747b-45bb-8174-d5af0c3910ea', 'Buyer 2', 4035.58, 'USD'),
  ('9e3d0237-02c8-48e4-bb76-d4b41c7ce985', 'e2438264-047d-4966-85d4-a6f38564491f', 'Buyer 3', 2295.05, 'USD'),
  ('6cb61b7a-67d7-4044-b0a8-975ac0ee8ecc', 'bd1782f7-bff0-4332-8251-9ef0d219c708', 'Buyer 4', 494.18, 'USD'),
  ('6a775510-1390-44e4-935c-ed07fea081fc', '9130db44-0adc-43ec-9176-34c4d8fa1b5f', 'Buyer 5', 1668.27, 'USD');

-- 13) Vaccinations
INSERT INTO vaccinations (id, event_id, vaccine, dosage, provider) VALUES
  ('16e0c01a-5b60-481f-88c2-8a20baf8a490', '598ce3b2-3510-4b33-a50e-25c519586bff', 'Vacuna 1', 'Dosis 1', 'Proveedor 1'),
  ('69c547c2-faf2-4463-829c-a4720fcb4169', '4c5bed42-747b-45bb-8174-d5af0c3910ea', 'Vacuna 2', 'Dosis 2', 'Proveedor 2'),
  ('2b8de7de-62ed-448c-ad20-7f4d49e8fceb', 'e2438264-047d-4966-85d4-a6f38564491f', 'Vacuna 3', 'Dosis 3', 'Proveedor 3'),
  ('0d87c410-fee8-482e-9f89-763a2a079011', 'bd1782f7-bff0-4332-8251-9ef0d219c708', 'Vacuna 4', 'Dosis 4', 'Proveedor 4'),
  ('2e289e1a-19b5-4aaa-8c19-c681588aabe1', '9130db44-0adc-43ec-9176-34c4d8fa1b5f', 'Vacuna 5', 'Dosis 5', 'Proveedor 5');

-- 14) Animal_History (Ejemplo, los IDs deben existir)
INSERT INTO animal_history (id, animal_id, modified, old_value, new_value, modified_by, modification_date) VALUES
  ('6bff95e2-6224-44ca-b02e-059e48f81b09', 'aaab3d4c-5623-491e-a666-f2e9c1d62cf1', 'status', 'alive', 'deceased', 'de3d6619-7d68-45a6-80df-2d464b6716d4', now()),
  ('e357dbfe-5132-4d7c-86c7-bb53dbcad4cd', '7eb4d619-6c02-4f02-ab7a-3e302a74eff6', 'status', 'alive', 'robbed', '100dc01b-7225-4893-b853-0c9bf1804bc4', now()),
  ('059cfd62-a94d-477d-91e6-8214013efe80', 'a964bb80-32fc-46d0-b239-e03125535430', 'status', 'alive', 'lost', '26b12297-942a-451e-95bf-2d98f915c636', now()),
  ('0ef8aa36-0abb-4921-82a6-31d9519d5b9a', '62645b97-955e-49ea-891e-24b6ff9180ae', 'status', 'alive', 'deceased', '0c2bcc02-7a08-47be-9c79-28f17117d8fa', now()),
  ('4507956f-75d2-43cd-8bbe-0eecf056a385', '8cfef1a6-77ed-4b17-ab30-176e88b8af37', 'status', 'alive', 'alive', 'f8766922-4928-4144-b8a4-cef1978b4cd7', now());

-- END