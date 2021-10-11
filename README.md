# kcsaweb

kcsa website

At root, run npm install
[Global access with npm]
$ npm install -g

[exception]
error msg

---

Error : EACCES: permission denied, access '/usr/local/lib/node_modules

Solution : Run with sudo

$ sudo npm install -g

````
npm install
```c

Go into client folder and run npm install

````

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
if you have an error like below
** Could not establish a connection with redis. Error: Redis connection to localhost:6379 failed - connect ECONNREFUSED 127.0.0.1:6379

Please install redis

cmd :

brew install redis
brew services start redis

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

## Stacks:

> TypeScript
>
> PostgreSQL

> **Backend:**
>
> Express.js
>
> Sequelize & Sequelize-typescript
>
> Graphql

> **Front:**
> React
>
> Material-UI for styling (Version 4).
>
> Apollo for graphql interaction to backend.

> **Cloud:**
> EC2 (TBD)
> S3
> SES

## **Sequelize**

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
`sudo lsof -i :5000`
Grab PID -> `kill -9 {PID}`
```

## TroubleShooting Note

1. Error MSG :
   Failed to load parser '@typescript-eslint/parser' declared in '../.eslintrc.json': Cannot find module '@typescript-eslint/parser'
   [1] Require stack:
   [1] - /Users/alice/Desktop/kcsaweb/.eslintrc.json
   [1] npm run client exited with code SIGINT

Situation : run 'npm run dev'
Solution : update typescript plugin
% npm i --save-dev typescript @typescript-eslint/parser
