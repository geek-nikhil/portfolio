
-- Create blogs table (if not exists)
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image text,
  views bigint default 0,
  likes int default 0,
  dislikes int default 0,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create comments table
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  blog_id uuid references public.blogs(id) on delete cascade not null,
  name text not null,
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog View Increment RPC
create or replace function increment_blog_view(blog_id_input uuid)
returns void as $$
begin
  update public.blogs
  set views = views + 1
  where id = blog_id_input;
end;
$$ language plpgsql security definer;

-- Reaction Increment RPC
create or replace function increment_reaction(blog_id_input uuid, reaction_type text)
returns void as $$
begin
  if reaction_type = 'like' then
    update public.blogs set likes = likes + 1 where id = blog_id_input;
  elsif reaction_type = 'dislike' then
    update public.blogs set dislikes = dislikes + 1 where id = blog_id_input;
  end if;
end;
$$ language plpgsql security definer;

-- Enable RLS
alter table public.blogs enable row level security;
alter table public.comments enable row level security;

-- Policies for Blogs
drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs"
  on public.blogs for select
  using (status = 'published');

drop policy if exists "Authenticated users can manage blogs" on public.blogs;
create policy "Authenticated users can manage blogs"
  on public.blogs for all
  to authenticated
  using (true)
  with check (true);

-- Policies for Comments
drop policy if exists "Public can read comments" on public.comments;
create policy "Public can read comments"
  on public.comments for select
  using (true);

drop policy if exists "Public can insert comments" on public.comments;
create policy "Public can insert comments"
  on public.comments for insert
  with check (true);
