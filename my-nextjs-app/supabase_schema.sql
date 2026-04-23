-- SQL for Supabase Table matching the interface

-- Create the table
create table public.purchase_orders_v2 (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  po_number text not null,
  date date not null,
  vendor text not null,
  description text not null,
  category text not null,
  quantity integer not null default 1,
  unit_cost numeric not null,
  total_cost numeric generated always as (quantity * unit_cost) stored, -- Auto-calculated
  requested_by text not null,
  status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
  subteam text not null, -- 'EV' | 'IC' | 'Admin'
  notes text,
  expected_delivery date
);

-- Enable Row Level Security (RLS)
alter table public.purchase_orders enable row level security;

-- Policy: Allow everyone to read (adjust for production)
create policy "Allow public read access"
on public.purchase_orders for select
to anon
using (true);

-- Policy: Allow authenticated users (or anon for now) to insert
create policy "Allow public insert access"
on public.purchase_orders for insert
to anon
with check (true);

-- Policy: Allow public update access
create policy "Allow public update access"
on public.purchase_orders for update
to anon
using (true);
