// queue.js
const { Queue, Worker } = require('bull');

const queue = new Queue('userQueue');

const processUserJob = async (job) => {
  // Your MongoDB storage logic here
  console.log(`Storing user data: ${job.data.name}, ${job.data.username}`);
  // Insert the data into MongoDB
  // ...

  return { success: true };
};

new Worker('userQueue', processUserJob);
