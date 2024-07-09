const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: [{
        type: Schema.Types.Mixed,
        ref: 'Rating'
    }],
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
})



module.exports = mongoose.model('Movie', movieSchema)