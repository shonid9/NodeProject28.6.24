






// a simple test to check if the server is running






















// require('dotenv').config({ path: process.env.dotenv_config_path }); // Load environment variables

// const mongoose = require('mongoose');
// const express = require('express');
// const User = require('./models/users'); // Import the User model

// const app = express();

// const port = process.env.PORT || 3000; // Use port from .env or default to 3000

// // Debugging: Log environment variables
// console.log('Environment:', process.env.NODE_ENV);
// console.log('MONGO_URI_DEV:', process.env.MONGO_URI_DEV);
// console.log('MONGO_URI_PROD:', process.env.MONGO_URI_PROD);

// // Connect to database based on environment
// let URI;
// if (process.env.NODE_ENV === 'development') {
//   URI = process.env.MONGO_URI_DEV; // Assuming you have a MONGO_URI_DEV for local connection
//   console.log('Connecting to MongoDB Compass (development environment)');
// } else {
//   URI = process.env.MONGO_URI_PROD; // Assuming you have a MONGO_URI_PROD for production (Atlas)
//   console.log('Connecting to MongoDB Atlas Cloud (production environment)');
// }

// mongoose
//   .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Successfully connected to database!');
//   })
//   .catch((error) => {
//     console.error('Error connecting to database:', error);
//     process.exit(1); // Exit process on connection error
//   });

// // Define a route to insert a user
// app.get('/insert-user', async (req, res) => {
//   try {
//     const newUser = new User({
//       name: 'eee tte',
//       email: 'ddd.e@eample.com',
//       password: '44fff' // In a real application, ensure passwords are hashed
//     });

//     await newUser.save();
//     res.send('User inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting user:', error);

//     // Check for specific error types
//     if (error.name === 'ValidationError') {
//       return res.status(400).send(`Validation Error: ${error.message}`);
//     } else if (error.name === 'MongoError' && error.code === 11000) {
//       return res.status(409).send('Duplicate Key Error: A user with this email already exists.');
//     } else {
//       return res.status(500).send(`Error inserting user: ${error.message}`);
//     }
//   }
// });

// // ... rest of your application logic for routes, models, etc.

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });







































//TEST
//ANOTHER WAY I tried


import dotenv from 'dotenv';
dotenv.config();
// Debug: Log the dotenv config path
console.log('Dotenv config path:', process.env.dotenv_config_path);


// Debug: Log process.env after dotenv.config
console.log('Process env after dotenv config:', process.env);

import mongoose from 'mongoose';
import express from 'express';
import { User } from './models/Users'; // Adjust path as needed

const app = express();

const port = process.env.PORT || 3000;

// Debugging: Log environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('MONGO_URI_DEV:', process.env.MONGO_URI_DEV);
console.log('MONGO_URI_PROD:', process.env.MONGO_URI_PROD);

// Define error interfaces
interface ValidationError extends Error {
  name: 'ValidationError';
  message: string;
}

interface MongoError extends Error {
  name: 'MongoError';
  message: string;
  code?: number;
}

// Connect to database based on environment
let URI = '';
if (process.env.NODE_ENV === 'development') {
  URI = process.env.MONGO_URI_DEV || '';
  console.log('Connecting to MongoDB Compass (development environment)');
} else if (process.env.NODE_ENV === 'production') {
  URI = process.env.MONGO_URI_PROD || '';
  console.log('Connecting to MongoDB Atlas Cloud (production environment)');
}

if (!URI) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Successfully connected to database!');
  })
  .catch((error: any) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });

// Define a route to insert a user
app.get('/insert-user', async (req, res) => {
  try {
    const newUser = new User({
      name: 'eefrfe te',
      email: 'ddd.e@jnkle.com',
      password: '4ffrffr'
    });

    await newUser.save();
    res.send('User inserted successfully!');
  } catch (error: any) {
    console.error('Error inserting user:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).send(`Validation Error: ${(error as ValidationError).message}`);
    } else if (error.name === 'MongoError' && (error as MongoError).code === 11000) {
      return res.status(409).send('Duplicate Key Error: A user with this email already exists.');
    } else {
      return res.status(500).send(`Error inserting user: ${error.message}`);
    }
  }
});

// ... rest of your application logic for routes, models, etc.

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
