# Deploying

## Set up the EC2 instance:

1. Launch an EC2 instance
2. Connect to instance
3. Generate ssh deploy key on server and add it to github repo
   (https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
4. Connect to it and install NodeJS on it (https://github.com/nodesource/distributions)

## Set up the RDS instance:

1. Launch an RDS instance
2. Set up a user and password for the server to access it
3. Set up inbound rules - Type = PostgreSQL, Source=Anywhere
4. Connect to it and create your app's schema

## Set up nginx

1. Install nginx
2. Update server blocks and map / to client and /graphql to server
3. Build client files and copy them to where nginx is serving from

## Set up pm2

1. Install pm2
2. Add the server as a process

## Done
