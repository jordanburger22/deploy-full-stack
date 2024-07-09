const express = require('express')
const movieRouter = express.Router()
const Movie = require('../models/movie')
const Rating = require('../models/rating')


movieRouter.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find()
        return res.status(200).send(movies)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

movieRouter.get('/user', async (req, res, next) => {
    try {
        const movies = await Movie.find({ addedBy: req.auth._id })
        return res.status(200).send(movies)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

movieRouter.post('/', async (req, res, next) => {
    try {
        req.body.addedBy = req.auth._id
        const newMovie = new Movie(req.body)
        const savedMovie = await newMovie.save()
        return res.status(201).send(savedMovie)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

movieRouter.put('/rating/:id', async (req, res, next) => {
    try {
        req.body.movieId = req.params.id
        req.body.userId = req.auth._id
        const newRating = new Rating(req.body)
        const savedRating = await newRating.save()
        const updatedRating = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $push: { rating: savedRating }
            },
            { new: true }
        )
        return res.status(201).send(updatedRating)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

movieRouter.put('/change-rating/:id', async (req, res, next) => {
    try {
        const updatedRating = await Rating.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // First, pull the old rating from the movie's rating array
        const updatedMovie = await Movie.findByIdAndUpdate(
            updatedRating.movieId,
            { $pull: { rating: { _id: updatedRating._id } } },
            { new: true }
        );

        // Then, push the updated rating into the movie's rating array
        updatedMovie.rating.push(updatedRating);
        await updatedMovie.save();

        return res.status(201).send(updatedMovie);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});

movieRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const deletedItem = await Movie.findByIdAndDelete(req.params.id)
        const reviewsToDelete = await Rating.deleteMany({movieId: req.params.id})
        return res.status(200).send('Deleted movie and reviews')
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

movieRouter.put('/edit/:id', async (req, res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        return res.status(201).send(updatedMovie)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = movieRouter