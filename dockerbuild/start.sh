#!/bin/bash

echo "install nodejs modules ----------------------------------"
yarn install

echo "compile source code -------------------------------------"
npm run compile

echo "start pm2 -----------------------------------------------"
pm2 startOrGracefulReload pm2.json

echo "running -------------------------------------------------"
pm2 log


