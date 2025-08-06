CREATE OR REPLACE FUNCTION fn_check_animal_owner() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP IN ('INSERT') AND NEW.owner_id IS NULL THEN
        RAISE EXCEPTION 'No se permite animal sin owner_id';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_owner ON animals;
CREATE TRIGGER trg_check_owner
    BEFORE INSERT OR UPDATE ON animals
    FOR EACH ROW
    EXECUTE FUNCTION fn_check_animal_owner();
