const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const memberRoutes = express.Router();

const PORT = 4000;
const MONGO_PORT = 27017;

let Member = require('./member.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:' + MONGO_PORT + '/sandbox', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

memberRoutes.route('/').get(function(req, res) {
    Member.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

app.use('/members', memberRoutes);

app.listen(PORT, function() {    
    console.log("Server is running on Port: " + PORT);
});
