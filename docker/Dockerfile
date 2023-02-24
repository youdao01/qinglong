FROM node:14.6-alpine as builder
COPY package.json /tmp/build/
RUN set -x \
    && apk update \
    && apk add nodejs npm git \
    && cd /tmp/build \
    && npm install -g pnpm \
    && npm install -g umi \
    && pnpm install --prod

FROM node:14.6-alpine

ARG QL_MAINTAINER="youdao01"
LABEL maintainer="${QL_MAINTAINER}"
ARG QL_URL=https://github.com/${QL_MAINTAINER}/qinglong.git
ARG QL_BRANCH=master
ARG QL_VERSION=v2.10.8

ENV PNPM_HOME=/root/.local/share/pnpm \
    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.local/share/pnpm:/root/.local/share/pnpm/global/5/node_modules:$PNPM_HOME \
    NODE_PATH=/usr/local/bin:/usr/local/pnpm-global/5/node_modules:/usr/local/lib/node_modules:/root/.local/share/pnpm/global/5/node_modules \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    QL_DIR=/ql \
    QL_BRANCH=${QL_BRANCH}

RUN set -x \
    && sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && npm config set registry http://mirrors.cloud.tencent.com/npm \
    && apk update -f \
    && apk upgrade \
    && apk --no-cache add -f bash \
                             coreutils \
                             moreutils \
                             git \
                             curl \
                             wget \
                             tzdata \
                             perl \
                             openssl \
                             nginx \
                             nodejs \
                             jq \
                             openssh \
                             npm \
                             php7 \
                             mysql \
                             php7-curl \
                             php7-pdo \
                             php7-pdo_mysql \
                             php7-mysqli \
                             php7-json \
                             php7-ctype \
                             php7-pcntl \
                             php7-pecl-event \
                             php7-iconv \
                             php7-mbstring \
                             php7-openssl \
                             php7-posix \
                             php7-fileinfo \
                             php7-zlib \
                             php7-gd \
                             php7-intl \
                             php7-session \
    && rm -rf /var/cache/apk/* \
    && apk update \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && git config --global user.email "qinglong@@users.noreply.github.com" \
    && git config --global user.name "qinglong" \
    && git config --global http.postBuffer 524288000 \
    && npm install -g pnpm \
    && pnpm add -g pm2 ts-node typescript tslib \
    && rm -rf /root/.pnpm-store \
    && rm -rf /root/.local/share/pnpm/store \
    && rm -rf /root/.cache \
    && rm -rf /root/.npm

ARG SOURCE_COMMIT
RUN git clone -b ${QL_BRANCH} ${QL_URL} ${QL_DIR} \
    && cd ${QL_DIR} \
    && cp -f .env.example .env \
    && chmod 777 ${QL_DIR}/shell/*.sh \
    && chmod 777 ${QL_DIR}/docker/*.sh \
    && git clone -b ${QL_VERSION} https://github.com/${QL_MAINTAINER}/qinglong-static.git /static \
    && mkdir -p ${QL_DIR}/static \
    && cp -rf /static/* ${QL_DIR}/static \
    && rm -rf /static

COPY --from=builder /tmp/build/node_modules/. /ql/node_modules/

WORKDIR ${QL_DIR}
