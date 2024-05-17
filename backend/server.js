require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests AFTER connecting to db
    app.listen(process.env.PORT, () => {
        console.log('Connected to db; listening on port ' + process.env.PORT + '.')
    })

})
.catch((error) => {
    console.log(error)
})





