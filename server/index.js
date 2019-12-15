const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const morgan = require('morgan')

// Database configuration file
const db = require('./config/dbconfig')

// Check the environment where the project is running
const env = process.env.NODE_ENV || 'prod'

//Routes file configuration
const { userRoutes } = require('./routes/user/index');
const { commentRoutes } = require('./routes/comments/index')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/user', userRoutes);
app.use('/comment', commentRoutes)


// Database Connection
db.connect((err) => {
    if (err) {
        console.log('unable to connect to the database');
    } else {
        const port = process.env.port || 3001
        app.listen(port, () => console.log(`database connection established and server is running on ${port}`))
    }
})
