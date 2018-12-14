FROM node:10.12.0-alpine as builder

# set Node environment variable to production
ENV NODE_ENV production

# Node directory in container
WORKDIR /usr/src/app

# copy package.json and package-lock.json to install libraries
COPY package.json package-lock.json ./
RUN npm cache clear --force \
  && npm install \
  && npm cache clear --force

#RUN ls -la /usr/src/app/

# copy all source files to docker and build 
COPY ./ ./
RUN npm run build --verbose

ENTRYPOINT ["npm start"]

# We have express, so nginx is deprecated
# FROM nginx:1.13.9-alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# start command for devops
# docker run -p 5001:80 -d {image}
# docker-compose -f docker-compose.yml up