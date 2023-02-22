FROM whyour/qinglong:2.10.8

rm -rf /ql

ARG QL_MAINTAINER="whyour"
LABEL maintainer="${QL_MAINTAINER}"
ARG QL_URL=https://github.com/${QL_MAINTAINER}/qinglong.git
ARG QL_BRANCH=master
ARG QL_VERSION=v2.10.8

ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    QL_DIR=/ql \
    QL_MAINTAINER=${QL_MAINTAINER} \
    QL_URL=${QL_URL} \
    QL_BRANCH=${QL_BRANCH}

WORKDIR ${QL_DIR}

RUN set -x \
    && sed -i 's/mirrors.tuna.tsinghua.edu.cn/mirrors.aliyun.com/g' /etc/apk/repositories \
    && npm config set registry http://mirrors.cloud.tencent.com/npm \
    && apk update -f \
    && apk upgrade \
    && apk --no-cache add -f php7 \
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
    && cd ${QL_DIR} \
    && rm -rf static \
    && git clone -b ${QL_BRANCH} https://github.com/${QL_MAINTAINER}/qinglong-static.git /static \
    && cp -rf /static/* ${QL_DIR} \
    && rm -rf /static
    
ENTRYPOINT ["./docker/docker-entrypoint.sh"]
