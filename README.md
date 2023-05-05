<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Welcome to the Atmosphere API repository! This is a RESTful API built using [NestJs](https://github.com/nestjs/nest), Express, and MongoDB.

The Atmosphere API provides simple endpoint for retrieving  air quality data,. It utilizes the IQAir API to provide air quality information based on latitude and longitude.

## Installation

To install the Atmosphere API, follow these steps:

1 - Clone the repository:
```bash
git clone https://github.com/ahmedgamal47/atmosphere-api.git
```

2 - Install the dependencies:
```bash
cd atmosphere-api
npm install
```

3 - Create a .env file based on the .env.example file and set the appropriate environment variables:
```bash
MONGO_HOST=mongodb://db:27017/iqAir
iqAir_apiKey=your_iqair_api_key_here
iqAir_baseUrl=https://api.airvisual.com
```

you can create your IQAir credentials from here [IQAir](https://www.iqair.com/dashboard/api)

4 - Start the server:
```bash
npm run start:dev
```

Alternatively, you can use Docker Compose to run the Atmosphere API. Simply run:
```bash
docker-compose up
```


## Usage

This Api supports OpenAPI/Swagger documentation, you can visit the baseUrl and it will show up 
Swagger UI Documentation
```bash
http://localhost:3000/
```
## Test

```bash
# unit tests
$ npm run test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License
Nest is [MIT licensed](LICENSE).
