-- Create database called "weekend-to-do-app"

-- Create Table
CREATE TABLE "tasks"(
    "id" serial primary key,
    "task" varchar (250) not null,
    "status" boolean default 'False'
);

-- Select all tasks/display "tasks" table in Postico
SELECT * FROM "tasks"

-- Add a new task to table
INSERT INTO "tasks" ("task") VALUES ('Mow lawn');

-- Delete a task from table
DELETE FROM "tasks" WHERE "id" = 1;