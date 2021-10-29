#!/bin/bash

# #step 1 : backup existing kcsaweb
# if [ -d /home/ubuntu/kcsaweb ]; then
#     sudo cp -r  /home/ubuntu/kcsaweb/* /home/ubuntu/bkup/kcsa_$(date '+%Y_%m_%d')/
#     echo 'Here is the current BKUP DIR List (/home/ubuntu/bkup/): '
#     ls -ltr /home/ubuntu/bkup/kcsa_$(date '+%Y_%m_%d')
# fi

#step 2 : delete existing kcsaweb
if [[ -d /home/ubuntu/kcsaweb ]]; then
    sudo rm -rf /home/ubuntu/kcsaweb
    echo 'Here is the current Root DIR List : '
    ls -ltr /home/ubuntu
fi



