#!/bin/bash

NODE_OPTIONS=--max_old_space_size=1500 pm2 start ts-node -- -P tsconfig.json ./server/app.ts;
echo 'start kcsa by pm2... in local';
sleep 1;


status_nginx=`sudo systemctl status nginx | grep "inactive"`
if [ $status_nginx=" "]; then
    echo "nginx already active"
else
    sudo systemctl restart nginx;
    echo 'Restart nginx server...';
    echo 'All done';
fi


