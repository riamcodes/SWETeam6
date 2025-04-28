#!/bin/sh
echo "Waiting for MySQL to be ready..."
until nc -z db 3306; do
  sleep 1
done
echo "MySQL is up. Starting Spring Boot..."
exec java -jar app.jar
