// src/controllers/crudController.js

const db = require('../db/db');
const redis = require('redis'); // Import the redis library
var connected = false;
const collectionName = 'cars';
const client = redis.createClient(); // Create a Redis client instance


client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', function () {
  console.log('Connected!');
});

async function getCar(num, forceDb = false) {
  if (!connected) {

    await client.connect();
    console.log('Connect to redis')
    connected = true
  }

  if (forceDb) {
    return await getFromDb(num);
  }
  const cacheValue = await getFromCache(num);
  if (cacheValue) {
    return cacheValue
  } else {
    return await getFromDb(num);
  }
}

async function getFromDb(num) {
  const database = db.getDB();
  try {
    const car = await database.collection(collectionName).findOne({ 'id': parseInt(num) });
    return car;
  } catch (error) {
    console.error(error);
    // You might want to handle the error more gracefully here
  }
}

async function getFromCache(num) {
  const cacheKey = `car:${num}`;

  // Attempt to retrieve data from the Redis cache


  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      // Data found in the cache, parse it and resolve the promise
      return JSON.parse(cachedData)
    } else {
      // Data not found in the cache, fetch from the database and store it in the cache
      getFromDb(num).then(async (carData) => {
        // Store the data in the cache with an expiration time (e.g., 1 hour)
        await client.set(cacheKey, JSON.stringify(carData))
        return carData
      })
    }


  } catch (error) {

  }



}

module.exports = {
  getCar,
};
