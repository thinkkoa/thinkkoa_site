FROM yunhe/nginx-nodejs:latest

MAINTAINER richenlin <richenlin@gmail.com>

WORKDIR /acs/data

EXPOSE 80 443 3000

CMD ["sh", "/start.sh"]