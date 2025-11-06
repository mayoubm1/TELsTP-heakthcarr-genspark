#!/bin/bash

# Supabase connection string
DB_URL="postgresql://postgres:Maayoubm235152!?@db.vrfyjirddfdnwuffzqhb.supabase.co:5432/postgres"

echo "Applying Supabase migrations..."

# Apply each migration in order
for migration in supabase/migrations/*.sql; do
  echo "Applying migration: $migration"
  psql "$DB_URL" -f "$migration"
  if [ $? -eq 0 ]; then
    echo "✓ Successfully applied $migration"
  else
    echo "✗ Failed to apply $migration"
    exit 1
  fi
done

echo ""
echo "All migrations applied successfully!"
echo ""
echo "Database schema created with:"
echo "  ✓ Users table"
echo "  ✓ Courses table"
echo "  ✓ Modules table"
echo "  ✓ Lessons table"
echo "  ✓ Enrollments table"
echo "  ✓ Assignments table"
echo "  ✓ AI Messages table"
echo "  ✓ Virtual Labs table"
echo "  ✓ Row Level Security policies"
echo "  ✓ Sample seed data"
