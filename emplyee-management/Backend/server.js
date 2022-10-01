const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); // CREATING THE EXPRESS SERVER
const port = process.env.PORT || 5000;

app.use(cors()); //MIDDLEWARE
app.use(express.json()); // ALLOWS TO PASS JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully!');
})

const employeeRouter = require('./Routes/employee');

app.use('/employee', employeeRouter);

app.listen(port, () => { // STARTS THE SERVER
    console.log(`Server is running on port : ${port}`);
})