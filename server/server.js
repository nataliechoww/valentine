const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const MovieShowModel = require('./models/MovieShow')

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB not connected', err));

//default
app.get('/', (req, res) => {
    res.json({ message: 'I love my boyfriend<3' });
});

//fun endpoint
app.get('/hi', (req, res) => {
    res.json({ message: 'I love my boyfriend<3' });
});

//validate login information
app.post('/login', async (req, res) => {
    const { password } = req.body;
    try {
        const users = await UserModel.find({ password });
        if (users.length > 0) {
            res.json("login success");
        } else {
            res.json("wrong password");
        }
    } catch (error) {
        console.error("Error checking password:", error);
        res.status(500).json("An error occurred");
    }
});

//get all movies for dropdown
app.get('/activity/movie', async (req, res) => {
    try {
        const movies = await MovieShowModel.find({ type: 'movie' });
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - cannot fetch movies' });
    }
})

//get all shows for dropdown
app.get('/activity/show', async (req, res) => {
    try {
        const shows = await MovieShowModel.find({ type: 'show' });
        res.json(shows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - cannot fetch shows' });
    }
})

//get description of activity
app.get('/activity/description', async (req, res) => {
    try {
        const { name } = req.query; 
        const description = await MovieShowModel.findOne({ name }); 
        if (!description) {
            return res.status(404).json({ message: 'Description not found' });
        }
        res.json(description.description); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - cannot fetch description' });
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`));
