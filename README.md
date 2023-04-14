# Starbucks API

### Usage
- Create a `.env` and copy the `.env.example` content into it.
- Run `npm i` to install the dependencies.
- Run `npm run docker-up` to start the PostgreSQL container
- Run `npm run db-migrate-dev` to run the database migrations
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
npm run db-migrate-mockCreate

// Generate and apply migrations
npm run db-migrate-dev

// Run the seed script
npm run db-seed

// Apply migrations in production and testing environments
npm run db-migrate-deploy

// Reset the databse and apply all migrations
npm run db-migrate-reset
````
# Context
The goal is to create a `Graphql` API that is able to manage a Starbucks coffee shop inventory.
- The inventory consists of categories of drinks.
- Each category has products that the customer can order.
- On any given product, the user can add any number of extras (each with a given
price).
- Products have a name, price and stock availability.
- The total price to charge the customer is the cost of the product plus any extras.
- You can define the price values as you like.

As an example, one possible configuration of this inventory would be:

- Espresso Drinks (category)
  - Latte
  - Mocha
  - Macchiato
  - Cappuccino
  - Americano
  - Espresso

- Brewed Coffee (category)
  - Filter coffee
  - Caffe Misto

- Tea (category)
  - Mint
  - Chamomile Herbal
  - Earl Grey

- Extras (the client needs to pay more for each extra)
  - Cinnamon
  - Yellow sugar
  - Syrup
  - Whipped Cream

### The operations required are:
- Create the inventory structure as mentioned above
- CRUD API for the above structure: products, categories and extras
- Be able to order a drink
  - To order a drink means that the API will compute the price, validate that there’s enough stock, validate that the customer has provided enough money for it and return the exchange amount to give back to the customer.
  - Let's say you order a drink that costs 11€ and you only give 10€. That should return something like “insufficient funds”.
