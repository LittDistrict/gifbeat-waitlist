-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert into waitlist
CREATE POLICY "Allow public to insert into waitlist" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read waitlist (optional)
CREATE POLICY "Allow authenticated users to read waitlist" ON waitlist
    FOR SELECT USING (auth.role() = 'authenticated');
