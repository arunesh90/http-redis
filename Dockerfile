# Build
FROM node:13-alpine as build

WORKDIR /app

COPY . /app

RUN yarn
RUN echo "Compiling TypeScript.." && yarn build
RUN rm -rf ./node_modules && yarn --production

# Final image
FROM node:13-alpine

WORKDIR /app/dist

COPY --from=build /app /app

CMD [ "node", "main.js" ]