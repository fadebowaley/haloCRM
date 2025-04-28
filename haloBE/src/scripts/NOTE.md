# Permission Scripts – Notes & Usage
This folder contains utility scripts for automatically generating and managing API permissions based on defined routes.

## 🧩 What’s Inside
permissions/generate.js
Logic to scan all route files, extract permission metadata, and generate structured permission objects.

## permissions/static.json
Add manually defined permissions here (like system or wildcard-level permissions not tied to a route).

permissions/snapshot.json
A snapshot of the last generated permissions – useful for versioning and audits.

generate-permissions.js
CLI entry point to run permission generation, seeding to DB, and cleanup of obsolete permissions.

## 🚀 How to Run
Make sure you’ve installed dependencies and your DB connection is active.

A. Run using Node:
node script/generate-permissions.js
B. Run with Flags:

Flag	Description
--seed	Saves new permissions into the database
--dry-run	Prints output but does not write to the database
--remove-obsolete	Deletes permissions that no longer match any route

Examples:
# Dry run only:
- node script/generate-permissions.js --dry-run

# Seed and remove outdated:
`node script/generate-permissions.js --seed --remove-obsolete`

# 🛠 Recommendations
Always run with --dry-run in development first to preview changes.

Add permissions you want to persist (but are not route-based) in static.json.


