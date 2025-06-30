# Gunakan image Nginx
FROM nginx:alpine

# Salin file ke direktori default Nginx
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
