#!/bin/sh

set -e

echo "Waiting for PostgreSQL database at ${DB_HOST}:${DB_PORT}..."

while ! nc -z "${DB_HOST:-db}" "${DB_PORT:-5432}"; do
  sleep 0.5
done

echo "PostgreSQL is up and running!"

# Run database migrations automatically
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || true

# Start Gunicorn server
echo "Starting Gunicorn server on port 8000..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
