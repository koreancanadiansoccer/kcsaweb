#!/bin/bash

# Below was commented out to move into env variable.
#  NODE_OPTIONS=--max_old_space_size=1500 

sudo NODE_OPTIONS=--max_old_space_size=1500 pm2 start ts-node -- -P /home/ubuntu/kcsaweb/tsconfig.json /home/ubuntu/kcsaweb/server/app.ts;
echo 'start kcsa by pm2... in local';
sleep 1;

sudo systemctl restart nginx;
echo 'Restart nginx server...';

status_nginx=`sudo systemctl status nginx | grep "inactive"`
if [[ -n status_nginx ]]; then
    echo "nginx still not active and will Restart nginx server"
    sudo systemctl restart nginx;
    echo 'Restart nginx server...';

else
    echo 'nginx is now active';
    echo 'All done';
fi


