CREATE OR REPLACE FUNCTION fn_audit_animal_changes()
  RETURNS TRIGGER AS $$
DECLARE
  changes JSONB := '{}'::jsonb;
BEGIN
IF NEW.breed   IS DISTINCT FROM OLD.breed   THEN
    changes := changes || jsonb_build_object(
      'breed',   jsonb_build_object('old', OLD.breed,   'new', NEW.breed)
    );
  END IF;

  IF NEW.status   IS DISTINCT FROM OLD.status   THEN
    changes := changes || jsonb_build_object(
      'status',   jsonb_build_object('old', OLD.status,   'new', NEW.status)
    );
  END IF;

  IF NEW.land_id  IS DISTINCT FROM OLD.land_id  THEN
    changes := changes || jsonb_build_object(
      'land_id',  jsonb_build_object('old', OLD.land_id,  'new', NEW.land_id)
    );
  END IF;

  IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN
    changes := changes || jsonb_build_object(
      'owner_id', jsonb_build_object('old', OLD.owner_id, 'new', NEW.owner_id)
    );
  END IF;

  -- Replace the jsonb_array_length line with this:
  IF changes = '{}'::jsonb THEN
    RETURN NEW;
  END IF;

  INSERT INTO animal_history(
    id,
    animal_id,
    modified,
    old_value,
    new_value,
    modified_by,
    modification_date
  )
  SELECT
    uuid_generate_v4(),
    NEW.id,
    key,
    (changes->key->>'old')::text,
    (changes->key->>'new')::text,
    COALESCE(current_setting('app.current_user_id', true)::uuid, NULL),
    now()
  FROM jsonb_object_keys(changes) AS key;

  PERFORM pg_notify(
    'animal_events',
    json_build_object(
      'animal_id', NEW.id,
      'changes',    changes,
      'timestamp',  now()
    )::text
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;