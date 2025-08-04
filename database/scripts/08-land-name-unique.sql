-- Add unique constraint to land names
-- This should prevent duplicate land names in the system

ALTER TABLE lands ADD CONSTRAINT unique_land_name UNIQUE (name);
