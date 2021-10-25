# Deploying

## Set up the EC2 instance:

1. Launch an EC2 instance
2. Connect to instance
3. Generate ssh deploy key on server and add it to github repo
   (https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
4. Connect to it and install NodeJS on it (https://github.com/nodesource/distributions)

## Set up the RDS instance:

1. Launch an RDS instance https://stackoverflow.com/questions/51014647/aws-postgres-db-does-not-exist-when-connecting-with-pg must setup initial db name otherwise it will default to 'postres'
2. Set up a user and password for the server to access it
3. Set up inbound rules - Type = PostgreSQL, Source=Anywhere
4. Connect to it and create your app's schema

## Running server;

1. Install redis `sudo apt-get install redis-server`
1. We don't need to 'watch' the files changing on prod.
1. run: `sudo npm install -g ts-node typescript '@types/node'`
1. run: `ts-node server/app.ts`

## Set up nginx

1. Install nginx; `sudo apt install nginx`
2. Update EC2 security group - Inbound rules to allow HTTP connection from anywhere.
3. Create folder for nginx `sudo mkdir /var/www/kcsa-demo`, `sudo chown -R $USER:$USER /var/www/kcsa-demo`
4. Copy files from client's build folder `cp -r build/* /var/www/kcsa-demo`
5. Update nginx config to server files from `kcsa-demo` folder:
6. `cd /etc/nginx/sites-available` -> `vim default`
7. find `root /var/www/html;`, change to `root /var/www/kcsa-demo`
8. under `location /{}` -> change `try_files $uri $uri/ = 404` to `try_files $uri /index.html;`
9. Setup backend proxy: Add following

```
location /graphql {
 proxy_pass http://localhost:5000/;
}
```

10. Restart nginx by; `sudo systemctl restart`
11. Build client: 'cd' into client folder and run `npm run build` -> creates `build` folder

## Set up pm2

1. Install pm2
2. Add the server as a process

## Done
