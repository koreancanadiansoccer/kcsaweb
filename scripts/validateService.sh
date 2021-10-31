#!/bin/bash

#check pm2 status
sudo pm2 list
#pm2 logs ts-node

#clean up kcsa_tmp
sudo rm -rf /home/ubuntu/kcsa_tmp/*
sudo ls -ltr


