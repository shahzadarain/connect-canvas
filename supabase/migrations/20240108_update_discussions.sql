-- Add new columns to book_discussions table
ALTER TABLE book_discussions
ADD COLUMN description text,
ADD COLUMN participants JSONB DEFAULT '[]',
ADD COLUMN last_activity timestamp with time zone DEFAULT now();

-- Add likes to discussion_messages
ALTER TABLE discussion_messages
ADD COLUMN likes integer DEFAULT 0,
ADD COLUMN liked_by uuid[] DEFAULT '{}';

-- Enable row level security
ALTER TABLE book_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_messages ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
CREATE POLICY "Enable read access for all users" ON "public"."book_discussions"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."book_discussions"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Enable read access for all users" ON "public"."discussion_messages"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."discussion_messages"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for message owners" ON "public"."discussion_messages"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);