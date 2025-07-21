DROP TRIGGER IF EXISTS trg_audit_animals ON animals;

CREATE TRIGGER trg_audit_animals
    AFTER UPDATE ON animals
    FOR EACH ROW
    EXECUTE FUNCTION fn_audit_animal_changes();
