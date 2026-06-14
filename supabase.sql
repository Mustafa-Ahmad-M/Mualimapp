-- مُعلّمي — كود إنشاء جدول النسخ الاحتياطي على Supabase
-- افتح مشروعك على supabase.com ← SQL Editor ← الصق هذا الكود ← Run

create table if not exists app_backups (
  id text primary key,
  data jsonb,
  updated_at timestamptz default now()
);

alter table app_backups enable row level security;

create policy "personal access" on app_backups
  for all using (true) with check (true);
