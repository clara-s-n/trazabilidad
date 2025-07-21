CREATE OR REPLACE FUNCTION fn_audit_animal_changes() RETURNS TRIGGER AS $$
DECLARE
    changes JSONB;
BEGIN
    -- Detectar qué columnas cambiaron
    changes := jsonb_build_object();
    IF NEW.status   IS DISTINCT FROM OLD.status   THEN changes := changes || jsonb_build_object('status', jsonb_build_object('old', OLD.status,   'new', NEW.status));   END IF;
    IF NEW.land_id  IS DISTINCT FROM OLD.land_id  THEN changes := changes || jsonb_build_object('land_id',jsonb_build_object('old', OLD.land_id,  'new', NEW.land_id));  END IF;
    IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN changes := changes || jsonb_build_object('owner_id',jsonb_build_object('old', OLD.owner_id, 'new', NEW.owner_id)); END IF;

    -- Si no hubo cambios críticos, salimos
    IF jsonb_array_length(jsonb_object_keys(changes)) = 0 THEN
        RETURN NEW;
    END IF;

    -- Insertar en animal_history por cada campo modificado
    INSERT INTO animal_history(id, animal_id, modified, old_value, new_value, modified_by, modification_date)
    SELECT
        uuid_generate_v4(),
        NEW.id,
        key,
        (changes->key->>'old')::text,
        (changes->key->>'new')::text,
        COALESCE(current_setting('app.current_user_id', true)::uuid, NULL),
        now()
    FROM jsonb_object_keys(changes) AS key;

    -- Notificar en tiempo real
    PERFORM pg_notify(
        'animal_events',
        json_build_object(
        'animal_id', NEW.id,
        'changes', changes,
        'timestamp', now()
        )::text
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
