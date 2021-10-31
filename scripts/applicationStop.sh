#!/bin/bash
#step 1 : stop pm2 
sudo pm2 delete ts-node;
echo 'Stop kcsa by pm2';
sleep 1;
sudo pm2 list

#step 2 : stop nginx
status_nginx=`sudo systemctl status nginx | grep "inactive"`
echo 'Current nginx Status' $status_nginx
if [[ -n $status_nginx ]]; then
    echo "nginx already stopped"
else
    sudo systemctl stop nginx;
    echo 'Stop nginx server...';
    echo 'All done';
fi

echo `sudo systemctl status nginx`
