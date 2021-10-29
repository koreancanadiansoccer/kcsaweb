#!/bin/bash
#step 1 : stop pm2 
pm2 delete ts-node;
echo 'Stop kcsa by pm2';
sleep 1;

#step 2 : stop nginx
status_nginx=`sudo systemctl status nginx | grep "active"`
if [[ $status_nginx=" " ]]; then
    echo "nginx already stopped"
else
    sudo systemctl stop nginx;
    echo 'Stop nginx server...';
    echo 'All done';
fi
