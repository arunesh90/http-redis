<h1 align="center">HTTP Redis API</h1>
<p align="center">
  <img src="https://img.shields.io/github/languages/top/arunesh90/http-redis.svg" />
  <img src="https://img.shields.io/github/license/arunesh90/http-redis.svg" />
  <img src="https://img.shields.io/docker/cloud/automated/arunesh90/http-redis.svg" />
  <img src="https://img.shields.io/docker/cloud/build/arunesh90/http-redis.svg" />
  <img src="https://images.microbadger.com/badges/image/arunesh90/http-redis.svg" />
</p>

> Simple HTTP API server for a Redis instance, with built-in compression.

## Install & Usage

#### Environment variables: 
* `REDIS_PORT` (optional): Port of your Redis instance
* `REDIS_HOST` (optional): Hostname/ip of your Redis instance
* `REDIS_PASS` (optional): Password of your Redis instance
* `APP_PORT` (optional): App port

```sh

curl -X POST '127.0.0.1:8080/api/set/test' \
--header 'Content-Type: application/json' \
--data '{
  "value": "test",
  "compression": "brotli"
}'
# OK

curl '127.0.0.1:8080/api/get/test'
# {
#   "found": true,
#   "compression": "brotli",
#   "value": "test"
# }
```

### Docker
```sh
docker pull arunesh90/http-redis

docker create arunesh90/http-redis \
  -p 80:80 \
  # Optional options
  -e REDIS_PORT="6379" \
  -e REDIS_HOST="127.0.0.1" \
  -e REDIS_PASS="" \
  -e APP_PORT="8080"

```

## Author

👤 **Arunesh**

* Twitter: [@arunesh90](https://twitter.com/arunesh90)
* Github: [@arunesh90](https://github.com/arunesh90)
* Discord: Pepe#9999 (97774439319486464)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
