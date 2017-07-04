## 线上部署

### PM2部署
pm2.json

```
//use pm2 start app
//pm2 startOrGracefulReload pm2.json
{
  "apps": [
    {
      "name": "node",
      "script": "index.js",
      "cwd": "/acs/data",
      "max_memory_restart": "300M",
      "instances"  : 2,
      "exec_mode"  : "cluster",
      "autorestart": true,
      "max_restarts": 10,
      "node_args": "",
      "args": [],
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}

```
pm2启动命令

```bash
pm2 startOrGracefulReload pm2.json

```


### Nginx反向代理


nginx.conf

```


    server {
        listen 80;
        server_name _;
        index index.html index.js;
        root /acs/data/static;
        set $node_port 3000;

        if ( !-f $request_filename ){
            rewrite (.*) /index.js;
        }

        location = /index.js {
            #proxy_http_version 1.1;
            proxy_set_header Connection "";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://127.0.0.1:$node_port$request_uri;
            proxy_redirect off;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico|svg|cur|ttf|woff)$ {
            expires      30d;
        }

        location ~ .*\.(js|css)?$ {
            expires 7d;
        }

        #access_log  /acs/logs/access_nginx.log  combined;

    }
    
```

### docker容器部署

参看[Dockerfile](https://github.com/thinkkoa/thinkkoa_site/tree/master/dockerbuild)