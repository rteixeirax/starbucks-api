# Starbucks API

### Usage
- Create a `.env` and copy the `.env.example` content into it.
- Run `npm i` to install the dependencies.
- Run `npm run docker-up` to start the PostgreSQL container
- Run `npm run db-migrate-dev` run the database migrations
- Start the app by running `npm run dev`.

### Available scripts
````
// Run development environment
npm run dev

// Check for lint errors
npm run lint

// Run the test suite
npm run test

// Build the app
npm run build

// Run production environment
npm run start

// Start the docker PostgreSQL container
npm run docker-up

// Shutdown the docker PostgreSQL container
npm run docker-down

// Create a migration without applying it
npm run db-migrate-create

// Generate and apply migrations
npm run db-migrate-dev

// Run the seed script
npm run db-seed

// Apply migrations in production and testing environments
npm run db-migrate-deploy

// Reset the databse and apply all migrations
npm run db-migrate-reset
````
