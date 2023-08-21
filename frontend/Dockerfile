  
FROM node:16.13.1 AS builder 

ENV NODE_OPTIONS="--max-old-space-size=1096" 

WORKDIR /build 

COPY package.json . 
COPY package-lock.json . 

RUN npm ci 
 
COPY . . 

RUN npm run build 
 
FROM nginx:alpine 
WORKDIR /usr/share/nginx/html 

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY certs/ certs/ 
COPY --from=builder /build/build .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]