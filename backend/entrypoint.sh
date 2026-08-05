#!/bin/sh

set -e

if [ -n "$DB_HOST" ] && [ "$DB_HOST" != "localhost" ]; then
  echo "Waiting for PostgreSQL database at ${DB_HOST}:${DB_PORT:-5432}..."
  while ! nc -z "${DB_HOST}" "${DB_PORT:-5432}"; do
    sleep 1
  done
  echo "PostgreSQL is reachable!"
fi

# Run database migrations automatically
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || true

# Start Gunicorn server
echo "Starting Gunicorn server on port ${PORT:-8000}..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3

