import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import RatingForm from "./RatingForm";


function Movie(props) {

    const { title, genre, review, rating, _id, addedBy } = props
    const { leaveRating, updateRating, user, deleteMovie } = useContext(UserContext)


    const calculateAverageRating = () => {
        if (rating.length === 0) return 0;

        const totalScores = rating.reduce((acc, rating) => acc + rating.score, 0);
        const averageRating = totalScores / rating.length;
        return averageRating.toFixed(2);
    };



    const currentRating = rating.find(obj => obj.userId === user._id)


    return (
        <div className="movie">
            <h2>Movie: {title}</h2>
            <h4>Genre: {genre}</h4>
            <h5>Reviewer Says: {review}</h5>
            <div className="seperater">
                {
                    !currentRating ?
                        <RatingForm
                            submit={leaveRating}
                            requestId={_id}
                        />
                        :
                        <RatingForm
                            submit={updateRating}
                            currentRating={currentRating}
                            requestId={currentRating._id}
                            movieId={_id}
                        />
                }
            </div>
            <p>Average Rating: {rating.length > 0 ? calculateAverageRating() : '-'}</p>
            <p>Ratings Left: {rating.length > 0 ? rating.length : 0}</p>
            {addedBy === user._id &&
                <>
                    <button onClick={() => deleteMovie(_id)}>Delete</button>
                </>}


        </div>
    );
}

export default Movie;