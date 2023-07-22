# Rainbow Birthday Discount System

The Rainbow Birthday Discount System is a NestJS-based application that allows you to send discounts to customers who have their upcoming birthdays in one week. The system consists of multiple services, each serving a specific functionality. The project uses Prisma as the ORM to interact with the PostgreSQL database.

## Features

- SignUp: Allows customers to sign up and create an account.
- Login: Provides authentication for registered users.
- JWT Authentication: Implements JSON Web Token (JWT) authentication for secure API access.
- Guards: Protects APIs using custom guards to ensure authorized access.
- Recommender: Recommends products to customers based on their purchase and view history.
- Emailer: Sends emails to customers, including discount codes and product recommendations.
- Rainbow Queue: Utilizes Bull as a message queue to send and track emails. Redis is used as the broker.
- Cron Job (Corn): Runs a cron job to continuously check customers' birthdays and sends requests to the Rainbow Queue.
- PostgreSQL Database: Uses PostgreSQL as the database to store customer information, products, discounts, etc.
- Prisma ORM: Leverages Prisma as the ORM to interact with the PostgreSQL database.

## Project Structure

The project consists of multiple services, each running on a different port. The services are as follows:

1. `rainbow-birthday-discount`: The main service responsible for signup, login, adding products, managing purchases, and tracking product click history for each customer.
2. `recommender`: A service responsible for recommending products based on customers' purchase and view history.
3. `emailer`: A service responsible for sending emails to customers.
4. `rainbow-queue`: Utilizes Bull as a message queue to send and track emails. This service uses Redis as the broker.
5. `corn`: The service responsible for running the cron job to check customers' birthdays and send requests to the Rainbow Queue.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
    git clone <repository_url>
    cd <repository_directory>

   ```

1. Install Dependencies

```bash
cd rainbow-birthday-discount
yarn install

cd ../recommender
yarn install

cd ../emailer
yarn install

cd ../rainbow-queue
yarn install

cd ../corn
yarn install
```

2. Set up the PostgreSQL database:

Make sure you have PostgreSQL installed and running.
Create a database named "rainbow" with the appropriate username and password (default is "postgres:1234").
Set up the environment variables:

3. Create a .env file in the root directory and define the following environment variables:
```bash
DATABASE_URL="postgresql://postgres:1234@localhost:5434/rainbow?schema=public"
JWT_SECRET="super-secret"
EMAIL="takrim@user.com"
PASSWORD="1234"
```
4. Migrate the database using Prisma:

```bash
cd rainbow-birthday-discount
yarn prisma migrate dev

```
5. Build and run each service on different ports

```bash
cd rainbow-birthday-discount
yarn build
yarn start:dev

cd ../recommender
yarn build
yarn start:dev

cd ../emailer
yarn build
yarn start:dev

cd ../rainbow-queue
yarn build
yarn start:dev

cd ../corn
yarn build
yarn start:dev

```

