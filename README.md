# kcsaweb

kcsa website

At root, run npm install

```
npm install
```

Go into client folder and run npm install

```
cd client
npm install
```

Install postgres and Create database:

```
\$ psql postgres
postgres=# CREATE USER kcsa_admin WITH SUPERUSER PASSWORD 'kcsa';
postgres=# CREATE DATABASE kcsa OWNER kcsa_admin;

```

Put following under .env file on root;

```
DB=kcsa
DB_USER=kcsa_admin
DB_PW=kcsa
DB_HOST=localhost

Ping Stanley to create AWS account for you.
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
REGION=us-east-2
TEAM_LOGO_BUCKET=kcsa-team-logo

```

Run
`npm run server`
This will start server and client and **create models into db**.

**Note: It is best practice to use migration files to update table definitions.  
As we are in early stage of development + tables are frequently changing,  
we decided to sync the DB by wiping out all tables from db -> run server which triggers Sequelize's sync method to create tables and properties against model definitions.**

Run seed:
`npx sequelize-cli db:seed:all`

At root, running `npm run dev` will start both the server and client.

http://localhost:5000/graphql -> Graphql test endpoint.
Try running;

```

query {
  getUsers {
    name
  }
}

OR

mutation {
  createUser(name:"test", password:"1233444", email:"test@test.com", type:"ADMIN") {
    name,
    email,
  }
}

```

Stacks: 
TypeScript
PostgreSQL

Backend:
Express.js
Graphql

Front:
React
Material-UI for styling (Version 4).
Apollo for graphql interaction to backend.

Cloud: 
EC2 (TBD)
S3
SES


**Sequelize**;
Generate seed file;
`npx sequelize-cli seed:generate --name [name of seed file]`

Run seed file;
`npx sequelize-cli db:seed:all`

Generate migration;
`npx sequelize-cli migration:generate --name [name_of_your_migration]`

run migration;
`npx sequelize-cli db:migrate`
Above will create migration file.

**Troubleshooting**;
If you run into issue on address in use;
`sudo lsof -i :3000`
Grab PID -> `kill -9 {PID}`
