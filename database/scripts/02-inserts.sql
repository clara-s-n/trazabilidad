-- 0) Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1) Roles (solo 3)
INSERT INTO rols (id, name, description) VALUES
  (uuid_generate_v4(), 'Operador Autorizado', 'Usuario autorizado por MGAP'),
  (uuid_generate_v4(), 'Usuario Consulta',      'Usuario con permisos de consulta'),
  (uuid_generate_v4(), 'Administrador',         'Administrador del sistema');

-- 2) Lands (10)
INSERT INTO lands (id, name, latitude, longitude)
SELECT
  uuid_generate_v4(),
  'Campo ' || gs,
  -31 - gs * 0.01,
  -57 - gs * 0.01
FROM generate_series(1,10) AS gs;

-- 3) Tags (10) — ahora casteando a tag_status
INSERT INTO tags (id, code, status)
SELECT
  uuid_generate_v4(),
  'TAG' || lpad(gs::text, 3, '0'),
  (ARRAY[
     'active'   ::tag_status,
     'inactive' ::tag_status,
     'retired'  ::tag_status
   ])[ floor(random()*3)::int + 1 ]
FROM generate_series(1,10) AS gs;

-- 4) Users (10)
INSERT INTO users (id, email, password_hash, rols_id, created_at)
SELECT
  uuid_generate_v4(),
  'user' || gs || '@example.com',
  'hash_pw' || gs,
  (SELECT id FROM rols ORDER BY random() LIMIT 1),
  now()
FROM generate_series(1,10) AS gs;

-- 5) Animals (10) — renombrada la columna breed, y añadiendo status
INSERT INTO animals (id, breed, birth_date, owner_id, land_id, created_at, updated_at, status)
SELECT
  uuid_generate_v4(),
  (ARRAY['Cow','Sheep','Goat','Pig','Horse','Donkey','Alpaca','Llama','Chicken','Turkey'])[gs],
  DATE '2020-01-01' + (gs - 1) * INTERVAL '1 month',
  (SELECT id FROM users ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  now(),
  now(),
  (ARRAY[
     'alive'    ::animal_status,
     'deceased' ::animal_status,
     'robbed'   ::animal_status,
     'lost'     ::animal_status
   ])[ floor(random()*4)::int + 1 ]
FROM generate_series(1,10) AS gs;

-- 6) Animal_Tag (10)
INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date, unassignment_date)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (SELECT id FROM tags ORDER BY random() LIMIT 1),
  now() - (10 - gs) * INTERVAL '1 day',
  CASE WHEN random() < 0.5 THEN now() - (10 - gs/2) * INTERVAL '1 day' ELSE NULL END
FROM generate_series(1,10) AS gs;

-- 7) Transports (10)
INSERT INTO transports (id, animal_id, origin_land_id, destiny_land_id, date, details)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  (SELECT id FROM lands ORDER BY random() LIMIT 1),
  now() + (gs - 5) * INTERVAL '1 day',
  'Transporte ' || gs
FROM generate_series(1,10) AS gs;

-- 8) Event Types (10)
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

-- 9) Events (10)
INSERT INTO events (id, event_type, date, comments, created_by)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM event_type WHERE name =
     (ARRAY['Birth','Sale','Vaccination','Weighing','Transport',
            'Tag Assignment','Tag Unassignment','Health Check',
            'Inspection','Retirement'])[gs]
  ),
  now() - (11 - gs) * INTERVAL '1 hour',
  'Evento ' || gs,
  (SELECT id FROM users ORDER BY random() LIMIT 1)
FROM generate_series(1,10) AS gs;

-- 10) Animal_Event (10)
INSERT INTO animal_event (id, event_id, animal_id)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  (SELECT id FROM animals ORDER BY random() LIMIT 1)
FROM generate_series(1,10) AS gs;

-- 11) Weightings (10)
INSERT INTO weightings (id, event_id, weight, unit)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  ROUND((random()*100 + 50)::numeric, 2),
  'kg'
FROM generate_series(1,10) AS gs;


-- 12) Sales (10)
INSERT INTO sales (id, event_id, buyer, price, currency)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  'Buyer ' || gs,
  ROUND((random()*1000 + 500)::numeric, 2),  -- casteo a numeric antes de redondear
  'USD'
FROM generate_series(1,10) AS gs;


-- 13) Vaccinations (10)
INSERT INTO vaccinations (id, event_id, vaccine, dosage, provider)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM events ORDER BY random() LIMIT 1),
  'Vacuna ' || gs,
  'Dose ' || gs,
  'Prov ' || gs
FROM generate_series(1,10) AS gs;

-- 14) Animal_History (10) — ahora usando 'breed' en vez de 'species'
INSERT INTO animal_history (id, animal_id, modified, old_value, new_value, modified_by, modification_date)
SELECT
  uuid_generate_v4(),
  (SELECT id FROM animals ORDER BY random() LIMIT 1),
  (ARRAY['status','land_id','owner_id','breed','birth_date'])[ floor(random()*5)::int + 1 ],
  'old_' || gs,
  'new_' || gs,
  (SELECT id FROM users ORDER BY random() LIMIT 1),
  now() - gs * INTERVAL '1 hour'
FROM generate_series(1,10) AS gs;
