create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and is_active = true
  );
$$;

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  site_name text not null,
  legal_name text,
  tagline text not null,
  contact_email text not null,
  whatsapp_url text,
  whatsapp_number text,
  whatsapp_prefill_message text,
  location_label text not null default 'Sri Lanka',
  footer_copyright_text text,
  footer_credit_text text,
  default_og_image_url text,
  theme_color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_sections (
  section_key text primary key,
  page_slug text not null,
  section_slug text not null,
  label text not null,
  content jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_slug, section_slug)
);

create table if not exists public.page_meta (
  page_slug text primary key,
  title text not null,
  description text,
  keywords text,
  og_title text,
  og_description text,
  canonical_url text,
  og_image_url text,
  noindex boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  icon_name text not null,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.portfolio_categories(id) on delete set null,
  couple_name text,
  display_title text,
  display_subtitle text,
  caption text,
  youtube_id text not null,
  featured_on_home boolean not null default false,
  home_feature_order integer,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  couple_name text not null,
  short_quote text not null,
  full_quote text not null,
  event_type text,
  event_year integer,
  location text,
  youtube_id text not null,
  show_on_home boolean not null default false,
  home_sort_order integer,
  page_sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_items (
  id uuid primary key default gen_random_uuid(),
  icon_name text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  icon_name text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.faq_groups(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_social_links_updated_at on public.social_links;
create trigger set_social_links_updated_at
before update on public.social_links
for each row execute function public.set_updated_at();

drop trigger if exists set_site_sections_updated_at on public.site_sections;
create trigger set_site_sections_updated_at
before update on public.site_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_page_meta_updated_at on public.page_meta;
create trigger set_page_meta_updated_at
before update on public.page_meta
for each row execute function public.set_updated_at();

drop trigger if exists set_portfolio_categories_updated_at on public.portfolio_categories;
create trigger set_portfolio_categories_updated_at
before update on public.portfolio_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;
create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_service_items_updated_at on public.service_items;
create trigger set_service_items_updated_at
before update on public.service_items
for each row execute function public.set_updated_at();

drop trigger if exists set_faq_groups_updated_at on public.faq_groups;
create trigger set_faq_groups_updated_at
before update on public.faq_groups
for each row execute function public.set_updated_at();

drop trigger if exists set_faq_items_updated_at on public.faq_items;
create trigger set_faq_items_updated_at
before update on public.faq_items
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.social_links enable row level security;
alter table public.site_sections enable row level security;
alter table public.page_meta enable row level security;
alter table public.portfolio_categories enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.service_items enable row level security;
alter table public.faq_groups enable row level security;
alter table public.faq_items enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Public can read active social links" on public.social_links;
create policy "Public can read active social links"
on public.social_links
for select
using (is_active = true);

drop policy if exists "Public can read enabled site sections" on public.site_sections;
create policy "Public can read enabled site sections"
on public.site_sections
for select
using (is_enabled = true);

drop policy if exists "Public can read page meta" on public.page_meta;
create policy "Public can read page meta"
on public.page_meta
for select
using (true);

drop policy if exists "Public can read active portfolio categories" on public.portfolio_categories;
create policy "Public can read active portfolio categories"
on public.portfolio_categories
for select
using (is_active = true);

drop policy if exists "Public can read published portfolio items" on public.portfolio_items;
create policy "Public can read published portfolio items"
on public.portfolio_items
for select
using (is_published = true);

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
on public.testimonials
for select
using (is_published = true);

drop policy if exists "Public can read published service items" on public.service_items;
create policy "Public can read published service items"
on public.service_items
for select
using (is_published = true);

drop policy if exists "Public can read active faq groups" on public.faq_groups;
create policy "Public can read active faq groups"
on public.faq_groups
for select
using (is_active = true);

drop policy if exists "Public can read published faq items" on public.faq_items;
create policy "Public can read published faq items"
on public.faq_items
for select
using (is_published = true);

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
using (public.is_admin_user());

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
on public.admin_users
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage social links" on public.social_links;
create policy "Admins can manage social links"
on public.social_links
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage site sections" on public.site_sections;
create policy "Admins can manage site sections"
on public.site_sections
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage page meta" on public.page_meta;
create policy "Admins can manage page meta"
on public.page_meta
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage portfolio categories" on public.portfolio_categories;
create policy "Admins can manage portfolio categories"
on public.portfolio_categories
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage portfolio items" on public.portfolio_items;
create policy "Admins can manage portfolio items"
on public.portfolio_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage testimonials" on public.testimonials;
create policy "Admins can manage testimonials"
on public.testimonials
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage service items" on public.service_items;
create policy "Admins can manage service items"
on public.service_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage faq groups" on public.faq_groups;
create policy "Admins can manage faq groups"
on public.faq_groups
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage faq items" on public.faq_items;
create policy "Admins can manage faq items"
on public.faq_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

