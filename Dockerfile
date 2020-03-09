FROM nginx
COPY money-ngnix.conf /etc/nginx/conf.d/default.conf
COPY dist/money-front-app /usr/share/nginx/html
