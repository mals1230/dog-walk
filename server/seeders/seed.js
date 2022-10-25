const db = require('../config/connection');
const { DogWalker } = require('../models');

const DogWalkerData = require('./DogWalkerSeeds.json');

db.once('open', async () => {
  await DogWalker.deleteMany({});

  const dogwalkers = await DogWalker.insertMany(DogWalkerData);

  console.log('Dog walkers seeded!');
  process.exit(0);
});

