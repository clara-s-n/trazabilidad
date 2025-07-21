-- 1) Evitar reactivar un tag: trigger BEFORE UPDATE en tags
CREATE OR REPLACE FUNCTION fn_prevent_tag_reactivation() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'retired'::tag_status
        AND NEW.status <> 'retired'::tag_status THEN
        RAISE EXCEPTION 'No se puede reactivar un tag retirado (id=%).', OLD.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_reactivation ON tags;
CREATE TRIGGER trg_prevent_reactivation
    BEFORE UPDATE OF status ON tags
    FOR EACH ROW
    EXECUTE FUNCTION fn_prevent_tag_reactivation();

-- 2) Impedir asignar un tag retirado: trigger BEFORE INSERT/UPDATE en animal_tag
CREATE OR REPLACE FUNCTION fn_check_tag_not_retired() RETURNS TRIGGER AS $$
DECLARE
    t_status tag_status;
    BEGIN
    SELECT status INTO t_status
        FROM tags
    WHERE id = NEW.tag_id;

    IF t_status = 'retired'::tag_status THEN
        RAISE EXCEPTION 'No se puede asignar el tag % porque está retirado.', NEW.tag_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_tag_retired ON animal_tag;
CREATE TRIGGER trg_check_tag_retired
    BEFORE INSERT OR UPDATE ON animal_tag
    FOR EACH ROW
    EXECUTE FUNCTION fn_check_tag_not_retired();
