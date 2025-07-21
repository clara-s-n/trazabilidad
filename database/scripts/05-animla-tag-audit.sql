CREATE OR REPLACE FUNCTION fn_notify_tag_assignment() RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify(
        'animal_events',
        json_build_object(
        'animal_id', NEW.animal_id,
        'tag_id', NEW.tag_id,
        'event', TG_OP,               -- INSERT o UPDATE
        'assignment_date', NEW.assignment_date,
        'unassignment_date', NEW.unassignment_date,
        'timestamp', now()
        )::text
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tag_notify ON animal_tag;

CREATE TRIGGER trg_tag_notify
    AFTER INSERT OR UPDATE ON animal_tag
    FOR EACH ROW
    EXECUTE FUNCTION fn_notify_tag_assignment();
