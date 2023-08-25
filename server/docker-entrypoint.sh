#!/bin/sh

echo "Waiting for MongoDB to start..."
./wait-for db:27017

echo "Migrating the database..."
npm run db:up

echo "Starting the server..."
npm start