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

AWS_ACCESS_KEY_ID = YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = YOUR_AWS_SECRET_ACCESS_KEY

```

Run
`npm run server`
This will start server and client and **create models into db**.

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
