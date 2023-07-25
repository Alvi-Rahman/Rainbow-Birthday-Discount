# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/recommender

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the app's source code
COPY . .

# RUN yarn prisma migrate dev
# RUN yarn prisma migrate deploy

RUN yarn build

# Expose the port that the NestJS app is listening on
EXPOSE 3331

# Command to run the app
CMD ["nest", "start"]
