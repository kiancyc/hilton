# Hilton Restaurant
A simple restaurant demo website made with Vue.js and Express.js, Data is persisted with MongoDB NoSQL database. It has RESTful and GrpaphQL APIs. Use localhost/admin/ for employees admin features.

## Project Structure
- It uses Vue.js and ElementUI for SPA frontend which is served by Express.js backend as a mono repo.
- It uses MongoDB to adapt to agile development.
- It uses Joi validator to validate input data and generate auto Swagger API documentation（localhost/docs/）.
- GraphQL API is used for querying data,(localhost/grapghql/).
- JEST unit test is integrated, use "npm test" to run demo test after server started ("npm run dev")

## Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production server
npm start
```

## Docker
```bash
# Build docker image
docker build -t hilton/restaurant.

# Run docker image
docker run -d -p 80:80 hilton/restaurant
```