# nodejs-api

A basic example of using Node.js, Express, and MongoDB to provide MongoDB data in a JSON format.

## The End Goal

The end goal of this code is to display a list of members from a MongoDB in JSON. 

## Steps

Before we start, [install brew](https://brew.sh/) if you don't already have it installed.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

1. Using a terminal, create a package.json file:

```
npm init -y
```

2. Install Express, Body-Parser, Cores, and Mongoose:

```
npm install express body-parser cors mongoose
```

3. Install nodemon:

```
npm install -g nodemon
```

nodemon is a NPM package that basically prevents you from having to restart your Node.js file each time you make a change. The package will listen for file changes and restart your Node.js file when detected. 

4. Create `index.js` and add the following code:

```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
```
4. Start noemon:

```
nodemon server
```

5. MondgDB removed it from the Homebrew core; however, there is a community version available:

```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

6. Make a folder for the database to save content in:

```
sudo mkdir -p /data/db
```
> Note: You may need to sue `sudo` when making the db folder.

THen make sure that the `/data/db` directory has the right permissions:

```
sudo chown -R `id -un` /data/db
```

7. Start MongoDB by opening a terminal and running the following command:

```
mongod --port 27018
```

> Note: THe above port can be ay number (not in use), but we will need to use the same number in our Node/js file.

8. To add some test data, open up a secon terminal and start the MongoDB shell:

```
mongo
```

Creata new database called sandbox:

```
use sandbox
```

Add some record to a membrs collection:

```
db.members.insertOne({"first":"Jane","last":"Doe","email":"jane.doe@address.com","admin":false});
db.members.insertOne({"first":"John","last":"Smith","email":"john.smith@address.com","admin":true});
db.members.insertOne({"first":"Isaiah","last":"Johnson","email":"isaiah.johnson@address.com","admin":true});
```

9. Create a file called `member.model.js` and place it in the root of the project folder. Add the following code:

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Member = new Schema({
    first: {type: String},
    last: {type: String},
    email: {type: String},
    admin: {type: Boolean}
});
module.exports = mongoose.model('Member', Member);
```

10. Create a file called `index.js` and also place it in the root of the project folder. Add the following code:
http://localhost:4000/members

```
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
```

