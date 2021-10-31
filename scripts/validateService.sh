#!/bin/bash

#check pm2 status
sudo pm2 list
#pm2 logs ts-node

#clean up kcsa_tmp
sudo cd /home/ubuntu/kcsa_tmp/
sudo rm -rf *
sudo ls -ltr


