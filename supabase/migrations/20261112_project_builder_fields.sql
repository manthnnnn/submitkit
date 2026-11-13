-- Migration: Add project builder fields to the projects table
-- Created: 2026-11-12

ALTER TABLE projects ADD COLUMN IF NOT EXISTS thumbnail_url TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS short_description TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS difficulty VARCHAR(20) DEFAULT 'Intermediate' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced'));
ALTER TABLE projects ADD COLUMN IF NOT EXISTS ppt_key TEXT DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS viva_qa JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS report_outline JSONB DEFAULT '[]'::jsonb;
