#!/bin/bash

echo "install nodejs modules ----------------------------------"
yarn install

echo "start pm2 -----------------------------------------------"
pm2 startOrGracefulReload pm2.json

echo "running -------------------------------------------------"
pm2 log


