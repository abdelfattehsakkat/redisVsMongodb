# Node.js Performance Comparison: Redis vs. MongoDB

This project is a simple Node.js application that serves as a REST API to retrieve car information. The goal of this project is to compare the performance of direct requests to the database using Redis and MongoDB.

## Getting Started

To set up and run this project, follow the steps below:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system.
- Redis: Install and run a Redis server.
- MongoDB: Install and run a MongoDB server.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/abdelfattehsakkat/redisVsMongodb.git
    ```
   
2. Navigate to the project directory:

 ```bash
cd redisVsMongodb
 ```

3. Install the project dependencies:

 ```bash
npm install
 ```


4. Configure your database connections in the db/db.js file for MongoDB and controllers/crudController.js for Redis.

   ### Running the Application


Start the Node.js server:

 ```bash
node server.js
 ```

The API endpoints are as follows:

/car/:id: Retrieve car information **directly** from the database (MongoDB).
/car/cache/:id: Retrieve car information with **Redis caching**.

### Benchmarking Performance

To compare the performance of Redis and MongoDB for direct requests, you can use the Apache Benchmark (ab) tool. Run the following command to benchmark a specific API endpoint, for example:

 ```bash
ab -n 5000 -c 10 http://localhost:3000/car/120 
 ```
This command will send 5000 requests with a concurrency of 10 to the /car/120 endpoint. You can adjust the number of requests and concurrency as needed.

- Perfomance requesting directly mongo: **2.4 seconds**

![image](https://github.com/abdelfattehsakkat/redisVsMongodb/assets/61501905/d42cfc9e-5c64-4eb7-a36a-623a83329f10)

- Performance using the Redis cache: **0.8 seconds**
![image](https://github.com/abdelfattehsakkat/redisVsMongodb/assets/61501905/67b1718a-7421-4b43-9937-5f6d76c10708)


