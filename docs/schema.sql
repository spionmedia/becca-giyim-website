-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  phone text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Addresses Table
create table addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null, -- e.g., "Home", "Work"
  address_line text not null,
  city text not null,
  district text not null,
  zip_code text,
  country text default 'Turkey',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table addresses enable row level security;

create policy "Users can view their own addresses." on addresses
  for select using (auth.uid() = user_id);

create policy "Users can insert their own addresses." on addresses
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own addresses." on addresses
  for update using (auth.uid() = user_id);

create policy "Users can delete their own addresses." on addresses
  for delete using (auth.uid() = user_id);


-- Orders Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  status text not null default 'pending', -- pending, processing, shipped, delivered, cancelled
  total_amount decimal(10, 2) not null,
  currency text default 'TRY',
  shipping_address_id uuid references addresses(id),
  payment_id text, -- Reference to Iyzipay payment ID
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table orders enable row level security;

create policy "Users can view their own orders." on orders
  for select using (auth.uid() = user_id);

create policy "Users can insert their own orders." on orders
  for insert with check (auth.uid() = user_id);

-- Order Items Table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) not null,
  product_id text not null, -- Assuming product IDs are text or change to uuid if your products table uses uuid
  product_name text not null,
  quantity integer not null,
  price decimal(10, 2) not null,
  variant_name text, -- e.g., "Size: M, Color: Red"
  image_url text
);

alter table order_items enable row level security;

create policy "Users can view their own order items." on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert their own order items." on order_items
  for insert with check (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );
