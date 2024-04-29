#!/bin/bash

# Source the .env file to load environment variables
source ./.env

# PostgreSQL credentials
username="$DB_USER"
password="$DB_PASSWORD"
database="$DB_NAME"
host="$DB_HOST"
port="$DB_PORT"

# Path to the SQL script
init_tables_script="./init.database.tables.sql"
populate_tables_script="./populate.database.tables.sql"

# Create the database
PGPASSWORD=$password psql -U $username -h $host -p $port -c "CREATE DATABASE $database"

# Check if the SQL database is created
if [ $? -eq 0 ]; then
    echo "Database $database successfully created!"
else
    echo "Error: Failed to create database."
fi

# Access the newly created database and run SQL script
PGPASSWORD=$password psql -U $username -h $host -p $port -d $database -f $init_tables_script

# Check if the SQL script was executed successfully
if [ $? -eq 0 ]; then
    echo "Tables loaded successfully."
else
    echo "Error: Failed to load tables."
fi

# Populates the database with the default data from my CV
PGPASSWORD=$password psql -U $username -h $host -p $port -d $database -f $populate_tables_script

# Check if the SQL script was executed successfully
if [ $? -eq 0 ]; then
    echo "Data loaded successfully."
else
    echo "Error: Failed to load data in the tables."
fi