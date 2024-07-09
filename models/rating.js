const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ratingSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
})


module.exports = mongoose.model('Rating', ratingSchema)