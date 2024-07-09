import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";



function Profile() {

    const { movies, getUserMovies } = useContext(UserContext)


    useEffect(() => {
        getUserMovies()
    }, [])

    console.log(movies)

    return (
        <div className="main">
            <MovieForm />
            <h1>Your Movie Reviews</h1>
            <MovieList movies={movies} />

        </div>
    );
}

export default Profile;