const express = require("express");
const Redis = require('ioredis');
const axios = require('axios');
const router = express.Router();
const { Queue, Worker, QueueScheduler } = require('bullmq');

const User = require('../model/User');


// Create a BullMQ queue
const userQueue = new Queue('userQueue');

// Create a BullMQ worker
// const userWorker = new Worker('userQueue', async job => {
//   const { name, username } = job.data;

//   // Create a new user instance
//   if(name=="" && username==""){
    
//   }
//   const newUser = new User({ name, username });

//   // Save the user to MongoDB
//   await newUser.save();

//   //await axios.post('http://localhost:5000/users', {name,username});

//   // You can perform additional tasks here if needed

//   return { message: 'User saved successfully' };
// });

// Create a BullMQ queue scheduler
//const userQueueScheduler = new QueueScheduler('userQueue');



//endpoint to fetch data from mongoDB
router.get('/', async (req, res)=>{
    const users = await User.find();
    res.json(users);
});

// Handle POST requests to save user data
// router.post('/', async (req, res)=>{
//   try {
//     const { username, name } = req.body;

//     if (!name || !username) {
//       return res.status(400).json({ error: 'Name and username are required fields.' });
//     }
//     // Add a job to the BullMQ queue
//     //await userQueue.add('saveUser', { username, name });

//     const newUser = new User({ name, username });
//     await newUser.save();
//     res.json(newUser);

//     const job = await worker.add('process-data', { name, username });

    

//     //res.status(202).json({ message: 'User created successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



module.exports = router;