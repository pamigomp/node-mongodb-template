FROM node:10.15.0

#Copy all project files to working directory
WORKDIR /app
COPY * *

#Expose ports
EXPOSE 8080
EXPOSE 8081

#Start microservice
CMD [ "npm", "start"]
