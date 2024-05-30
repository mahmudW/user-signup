const mongoose = require("mongoose");
const User = require("./model/User");
const axios = require('axios');
const express = require("express");
const app = express();

mongoose.connect("mongodb://127.0.0.1/signup")
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error connecting");
})

const userRoutes = require('./routes/api');

// Create a BullMQ queue
const { Queue, Worker, QueueScheduler } = require('bullmq');

const RegistrationQueue = new Queue('RegistrationQueue');


const port = 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.use(express.urlencoded({extended:true}));

app.post('/users', async (req, res) => {
    const { name, username } = req.body;
    const job = await RegistrationQueue.add('RegistrationQueue', { name, username });
    res.status(200).json({ message: 'Job added to the queue successfully' });
});

app.post('/users/update-default', async (req, res) => {
    try {
        const {name, username } = req.body;

        const newUser = new User({ name, username });
        await newUser.save();
        //res.json(newUser);
  
        // Update the default value in your Mongoose model
        await User.updateOne({ username: username }, { $set: { registered_in_serverb: true } });
        res.status(201).json({ message: 'User field updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(port,()=> console.log(`server running on port ${port}`));