#!/bin/bash

#关闭调试
#cp -rf ./index.js ./index.js.bak
sed -i "s/.*app_debug:.*/app_debug: false,/" ./index.js

#应用端口
#cp -rf ./src/config/config.js ./src/config/config.js.bak
sed -i "s/.*app_port:.*/app_port: 3000,/" ./lib/config/config.js