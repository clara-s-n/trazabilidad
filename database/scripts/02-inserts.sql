-- 1) Roles (estáticos: 3)
INSERT INTO roles (id, name, description) VALUES
  (1, 'Operador Autorizado', 'Usuario autorizado por MGAP'),
  (2, 'Usuario Consulta', 'Usuario con permisos de consulta'),
  (3, 'Administrador', 'Administrador del sistema');

-- 2) Predios (lands) – 100 registros
INSERT INTO lands (id, name, latitude, longitude)
VALUES ('ca751bd3-3df5-4967-8282-252ac89543ba', 'Campo 0', -31.1, -57.1);

INSERT INTO lands (id, name, latitude, longitude)
SELECT
  uuid_generate_v4(),
  'Campo ' || gs,
  -31 - gs * 0.01,
  -57 - gs * 0.01
FROM generate_series(1,100) AS gs;

-- 3) Tags – 100 registros
INSERT INTO tags (id, country_code, country_iso, ministry, tag_number, status)
SELECT
  uuid_generate_v4(),
  '00014', -- Uruguay según caravana nacional
  '858', -- ISO-3166-1 numérico
  'MGAP UY', -- Ministerio emisor
  lpad(gs::text, 4, '0'),
  (ARRAY['active'::tag_status, 'inactive'::tag_status, 'retired'::tag_status])
    [floor(random()*3)::int + 1]
FROM generate_series(1,100) AS gs;


-- 4) Usuarios
INSERT INTO users (id, email, password_hash, role_id, created_at)
VALUES
  ('3600e259-0cc1-491d-9860-aa4cff12155c', 'administrador@example.com', crypt('admin123', gen_salt('bf')), 3, now()),
  ('c4221f6c-9534-4537-8803-eb12ef89468a', 'consulta@example.com', crypt('consulta123', gen_salt('bf')), 2, now()),
  ('debeeeb4-e4a4-4823-8510-b09ff13a735b', 'operador@example.com', crypt('operador123', gen_salt('bf')), 1, now());

-- 100 registros extras
INSERT INTO users (id, email, password_hash, role_id, created_at)
SELECT
  uuid_generate_v4(),
  'user' || gs || '@example.com',
  'hash_pw' || gs,
  (SELECT id FROM roles ORDER BY random() LIMIT 1),
  now()
FROM generate_series(1,100) AS gs;

-- 5) Animales
-- Declarar las variables para reusar
DO $$
DECLARE
  admin_id UUID;
  consulta_id UUID;
  operador_id UUID;
  campo1_id UUID;
  campo2_id UUID;
  campo3_id UUID;
  campo4_id UUID;
  campo5_id UUID;
BEGIN
  SELECT id INTO admin_id FROM users WHERE email = 'administrador@example.com' LIMIT 1;
  SELECT id INTO consulta_id FROM users WHERE email = 'consulta@example.com' LIMIT 1;
  SELECT id INTO operador_id FROM users WHERE email = 'operador@example.com' LIMIT 1;
  SELECT id INTO campo1_id FROM lands WHERE name = 'Campo 1' LIMIT 1;
  SELECT id INTO campo2_id FROM lands WHERE name = 'Campo 2' LIMIT 1;
  SELECT id INTO campo3_id FROM lands WHERE name = 'Campo 3' LIMIT 1;
  SELECT id INTO campo4_id FROM lands WHERE name = 'Campo 4' LIMIT 1;
  SELECT id INTO campo5_id FROM lands WHERE name = 'Campo 5' LIMIT 1;

  INSERT INTO animals (id, breed, birth_date, owner_id, land_id, created_at, updated_at, status)
  VALUES
      ('56b33cc3-6e43-4aac-99cf-a90bc681d583', 'Aberdeen Angus', '2021-06-10', admin_id, campo1_id, now(), now(), 'alive'),
      ('b2e6d4f3-5c7f-22fd-92e4-1353bd241114', 'Holstein Friesian', '2020-12-03', consulta_id, campo2_id, now(), now(), 'alive'),
      ('c3d7e5a4-6d80-33fe-a3e5-2464ce352225', 'Hereford', '2019-08-21', operador_id, campo3_id, now(), now(), 'alive'),
      ('d4e8f6b5-7e91-44af-b4f6-3575df463336', 'Jersey', '2022-01-15', operador_id, campo4_id, now(), now(), 'alive'),
      ('2688b6cb-5333-4309-a5d1-53871d342d85', 'Charolais', '2021-11-30', consulta_id, campo5_id, now(), now(), 'alive');
END $$;

-- 100 registros (una por cada raza listada abajo)
INSERT INTO animals (id, breed, birth_date, owner_id, land_id, created_at, updated_at, status)
SELECT
  uuid_generate_v4(),
  breed_list.breed,
  (DATE '2020-01-01' + (random() * 1825)::int * INTERVAL '1 day')::date,
  (SELECT id FROM users ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  now(),
  now(),
  (ARRAY['alive'::animal_status, 'deceased'::animal_status, 'robbed'::animal_status, 'lost'::animal_status])
    [floor(random()*4)::int + 1]
FROM unnest(ARRAY[
  'Aberdeen Angus','Abigar','Abondance','Abruzzese','Agerolese','Alambadi','Albanian Prespa',
  'Aleutian Wild','Ankole-Watusi','Angus','Ayrshire','Barzona','Bazadaise','Beef Shorthorn',
  'Belgian Blue','Belted Galloway','Brahman','Brangus','Braunvieh','Brown Swiss','Charolais',
  'Chianina','Devon','Dexter','Dutch Belted','English Longhorn','Fleckvieh','Galloway','Gelbvieh',
  'Guernsey','Hereford','Highland Cattle','Holstein Friesian','Jersey','Limousin','Lincoln Red',
  'Luing','Maine-Anjou','Marchigiana','Murray Grey','Normande','Piedmontese','Pinzgauer','Red Angus',
  'Red Poll','Salers','Santa Gertrudis','Senepol','Shorthorn','Simmental','South Devon','Sussex',
  'Texas Longhorn','Wagyu','Welsh Black','White Park','Zebu','American Angus','American Brahman',
  'American Milking Devon','American White Park','Beefalo','Beefmaster','Braford','Corriente',
  'Florida Cracker','Pineywoods','Randall Lineback','Red Brangus','Simbrah','Alderney',
  'Anatolian Black','Australian Friesian Sahiwal','Australian Milking Zebu','Belgian Red',
  'Ennstaler Bergscheck','Kärntner Blondvieh','Murbodner','Original Braunvieh','Österreichisches Braunvieh',
  'Österreichisches Gelbvieh','Pustertaler Sprinzen','Tiroler Grauvieh','Tux-Zillertaler',
  'Waldviertler Blondvieh','Gir','Kankrej','Tharparkar','Sahiwal','Prim'' Holstein','Hérens',
  'Canadienne','Jersiaise','Romagnola','Romosinuano','Alentejana','Criollo','Nellore','Ongole',
  'Droughtmaster'
]) AS breed_list(breed);

-- 6) Asignaciones de tag (animal_tag) – 100 registros
INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date, unassignment_date)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (SELECT id FROM tags ORDER BY random() LIMIT 1),
  now() - (100 - gs) * INTERVAL '1 day',
  CASE WHEN random() < 0.5 THEN now() - (100 - gs/2) * INTERVAL '1 day' ELSE NULL END
FROM generate_series(1,100) AS gs;

-- 7) Transportes – 100 registros
INSERT INTO transports (id, animal_id, origin_land_id, destiny_land_id, date, details)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  now() - (random()*30)::int * INTERVAL '1 day',
  'Transporte ' || gs
FROM generate_series(1,100) AS gs;

-- 8) Tipos de evento (event_type) – estáticos: 10
INSERT INTO event_type (name, description) VALUES
  ('Birth',           'Registro de nacimiento'),
  ('Sale',            'Venta de animal'),
  ('Vaccination',     'Aplicación de vacuna'),
  ('Weighing',        'Registración de peso'),
  ('Transport',       'Movimiento entre campos'),
  ('Tag Assignment',  'Asignación de tag'),
  ('Tag Unassignment','Desasignación de tag'),
  ('Health Check',    'Control sanitario'),
  ('Inspection',      'Inspección técnica'),
  ('Retirement',      'Retiro del sistema');

-- 9) Eventos – 100 registros
INSERT INTO events (id, event_type, date, comments, created_by)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM event_type ORDER BY random() LIMIT 1),
  now() - (random()*30)::int * INTERVAL '1 day',
  'Evento ' || gs,
  (SELECT id FROM users ORDER BY random() LIMIT 1)
FROM generate_series(1,100) AS gs;

-- 10) Vínculo animal–evento (animal_event) – 100 registros
INSERT INTO animal_event (id, event_id, animal_id)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  (SELECT id FROM animals ORDER BY random() LIMIT 1)
FROM generate_series(1,100) AS gs;

-- 11) Pesajes (weightings) – 100 registros
INSERT INTO weightings (id, event_id, weight, unit)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  ROUND((random()*500 + 50)::numeric, 2),
  'kg'
FROM generate_series(1,100) AS gs;

-- 12) Ventas (sales) – 100 registros
INSERT INTO sales (id, event_id, buyer, price, currency)
SELECT
  uuid_generate_v4(),
  ae.event_id,
  'Buyer ',
  ROUND((random() * 2000 + 100)::numeric, 2),
  'USD'
FROM (
  SELECT event_id
  FROM animal_event
  JOIN events ON events.id = animal_event.event_id
  JOIN event_type ON event_type.id = events.event_type
  WHERE event_type.name = 'Sale'
) ae
LIMIT 100;

-- 13) Vacunaciones (vaccinations) – 100 registros
INSERT INTO vaccinations (id, event_id, vaccine, dosage, provider)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  'Vacuna ' || gs,
  'Dose ' || gs,
  'Prov ' || gs
FROM generate_series(1,100) AS gs;

-- 14) Historial de cambios (animal_history) – 100 registros
INSERT INTO animal_history (id, animal_id, modified, old_value, new_value, modified_by, modification_date)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (ARRAY['status','land_id','owner_id','breed','birth_date'])
    [floor(random()*5)::int + 1],
  'old_' || gs,
  'new_' || gs,
  (SELECT id FROM users ORDER BY random() LIMIT 1),
  now() - gs * INTERVAL '1 hour'
FROM generate_series(1,100) AS gs;
