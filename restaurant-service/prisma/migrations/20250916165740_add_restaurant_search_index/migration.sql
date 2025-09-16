-- This is an empty migration.
-- This creates a GIN index on the name and cuisine columns using the trigram operator class.
-- This will make similarity searches on these columns extremely fast.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX restaurant_search_idx ON "Restaurant" USING gin (name gin_trgm_ops, cuisine gin_trgm_ops);