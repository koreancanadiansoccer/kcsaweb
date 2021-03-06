# Deploying

## Set up the EC2 instance:

1. Launch an EC2 instance
1. Edit up security to inbound for http.
1. Connect to instance
1. Generate ssh deploy key on server and add it to github repo
   (https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
1. Connect to it and install NodeJS on it (https://github.com/nodesource/distributions)

## Set up the RDS instance:

1. Launch an RDS instance https://stackoverflow.com/questions/51014647/aws-postgres-db-does-not-exist-when-connecting-with-pg must setup initial db name otherwise it will default to 'postres'
2. Set up a user and password for the server to access it
3. ![image](https://user-images.githubusercontent.com/89957153/138700005-81871201-4167-484f-b7c1-1a31bd2962ac.png)

4. Set up inbound rules - Type = PostgreSQL, Source=Anywhere
5. Create .env file in root folder - EC2 instance  
   Current Location of .env file : /home/ubuntu/kcsa-demo/.env
6. Configure DB info and AWS KEY in .env file
   [format]
   `DB=""`
   `DB_USER= `
   `DB_PW=`
   `DB_HOST=`

   `AWS_ACCESS_KEY_ID=`
   `AWS_SECRET_ACCESS_KEY=`
   `REGION=`

7. Connect to it and create your app's schema

## Running server;

1. Install redis `sudo apt-get install redis-server`
1. We don't need to 'watch' the files changing on prod.
1. run: `sudo npm install -g ts-node typescript '@types/node'`
1. If you want to confirm that db is connected, run: `ts-node server/app.ts`. If not continue on.

## Set up nginx

1. Install nginx; `sudo apt install nginx`
2. Update EC2 security group - Inbound rules to allow HTTP connection from anywhere.
3. Create folder for nginx `sudo mkdir /var/www/kcsa-demo`, `sudo chown -R $USER:$USER /var/www/kcsa-demo`
4. Copy files from client's build folder `cp -r /home/ubuntu/kcsa-demo/client/build/* /var/www/kcsa-demo`
5. Update nginx config to server files from `kcsa-demo` folder:
6. `cd /etc/nginx/sites-available` -> `sudo vim default`
7. find `root /var/www/html;`, change to `root /var/www/kcsa-demo`
8. Inside `location /{ ... }` (moste likely on line 51) -> change `try_files $uri $uri/ = 404` to `try_files $uri /index.html;`
9. Setup backend proxy: Add following

```
location /graphql {
 proxy_pass http://localhost:5000/graphql;
}
```

10. Restart nginx by; `sudo systemctl restart nginx`

## Set up pm2

1. Install pm2 `sudo npm install -g pm2`
1. Install typescript; `sudo pm2 install typescript`
1. Install type config: `sudo pm2 install @types/node`
1. `NODE_OPTIONS=--max_old_space_size=1500 pm2 start ts-node -- -P tsconfig.json ./server/app.ts`
1. To stop; `pm2 stop ts-node`
1. To delete: `pm2 delete ts-node`

## TODO:

1. We need to minimize memory usage on ts-node and pm2 inits: https://dev.to/aspecto/how-to-reduce-ram-consumption-by-6x-when-using-ts-node-4d8p, https://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2
1. Why are all commands taking freakishly slow?????
1. Build frontend build files on server `cd client` -> run `npm run build` -> currently it takes crazy long - is there way to minimize this?
1. disabling sequelize.sync() on prod to minimize init -> Is it necessary?
1. We should run sequelize migration script in CD process.
1. ts-node seems to hang?
1. Is there any reasons to separate security groups (launch-wizard-1,default)?

## Done
