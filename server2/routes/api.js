
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create a BullMQ worker for the queue
// const worker = new Worker('myQueueName', async (job) => {
//   // Process the job data
//   console.log('Processing job:', job.data);
// });

// Start the worker
//worker.start();


router.get('/', async (req, res) => {
  try {
    // Use Prisma to fetch data from the database
    const data = await prisma.user.findMany();

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// router.post(('/'), async (req, res)=>{
//   const {u_name, username} = req.body;

//   if (!u_name || !username) {
//     return res.status(400).json({ error: 'Name and username are required fields.' });
//   }
//   // Save data to PostgreSQL using Prisma
//   const newUser = await prisma.user.create({
//     data: {
//       u_name,
//       username,
//     },
//   });

//   res.json(newUser);

// });

module.exports = router;
