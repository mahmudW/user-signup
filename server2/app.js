const express = require("express");
const app = express();
const axios = require('axios');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const UserQueue = new Queue('UsersQueue');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

const userRoutes = require('./routes/api');

const port = 5000;


app.use(express.json());
app.use('/users', userRoutes);

const worker = new Worker('RegistrationQueue', async (job)=>{
    const { name, username } = job.data;
    const u_name = name;
    // Update MongoDB
    // For simplicity, assuming that the MongoDB is on the same server as Server A
    await axios.post('http://localhost:3000/users/update-default', { name, username });

    // Update PostgreSQL using Prisma
    // Your Prisma update logic goes here
    if (!u_name || !username) {
        return res.status(400).json({ error: 'Name and username are required fields.' });
      }
      // Save data to PostgreSQL using Prisma
      const newUser = await prisma.user.create({
        data: {
          u_name,
          username,
        },
      });
});

worker.on('completed', job => {
    console.log(`Job completed.`);
});
  
worker.on('failed', (job, error) => {
      console.log(`Job failed with error: ${error.message} on port ${port}`);
});



app.listen(port,()=> console.log(`server running on port ${port}`));