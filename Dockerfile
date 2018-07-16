FROM nginx:alpine
LABEL maintainer="Andrey Bakhvalov <bakhvalov.andrey@gmail.com>"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
