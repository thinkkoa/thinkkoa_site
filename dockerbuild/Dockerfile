FROM node:8.9.1-alpine

MAINTAINER richenlin, https://github.com/richenlin

ENV TENGINE_VERSION 2.2.0
ENV NODEJS_VERSION 8.9.1

# Upgrade
RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.6/main\n\
https://mirror.tuna.tsinghua.edu.cn/alpine/v3.6/community" > /etc/apk/repositories

RUN apk update && apk upgrade

# Time Zone
RUN apk add --no-cache bash ca-certificates && \
    apk add --no-cache tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# Install module
RUN npm install -g pm2@2.7.2 yarn@1.3.2
    
RUN yarn --version

# Clean 
RUN rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* 


# Workdir
RUN mkdir -p /acs/data
WORKDIR /acs/data

# Expose port
EXPOSE 80 443

# Configure
COPY start.sh /start.sh
COPY pm2.json /pm2.json

CMD ["sh", "/start.sh"]
