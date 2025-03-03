const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose  = require('mongoose')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const movieRouter = require('./routes/movieRouter')
const authRouter = require('./routes/authRouter')
const path = require('path')


app.use(express.json())
app.use(morgan('dev'))
// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));


const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

connectToDB()

app.use('/api/auth', authRouter)
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/main/movie', movieRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT, () => console.log(`Server is running on PORT: ${process.env.PORT}`))
