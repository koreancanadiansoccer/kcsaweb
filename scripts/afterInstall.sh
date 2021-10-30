#!/bin/bash

#install npm in client 
cd /home/ubuntu/kcsaweb/client
sudo npm install
#install npm in root
cd /home/ubuntu/kcsaweb
sudo npm install

#copy .env file from /home/ubuntu/config to Root DIR for kcsaweb
sudo cp /home/ubuntu/config/.env /home/ubuntu/kcsaweb/.
#migrate sequelize
sudo npx sequelize-cli db:migrate
# sudo npx sequelize-cli seed:generate --name [name of seed file]
# sudo npx sequelize-cli db:seed:all
# sudo npx sequelize-cli migration:generate --name [name_of_your_migration]
# sudo npx sequelize-cli db:migrate

#Set up nginx
sudo cp -r /home/ubuntu/kcsaweb/client/build* /var/www/kcsa-demo/




