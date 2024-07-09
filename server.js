const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose  = require('mongoose')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const movieRouter = require('./routes/movieRouter')
const authRouter = require('./routes/authRouter')


app.use(express.json())
app.use(morgan('dev'))



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

app.listen(process.env.PORT, () => console.log(`Server is running on PORT: ${process.env.PORT}`))
