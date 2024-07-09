import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";



function Home() {

    const { allMovies, getAllMovies } = useContext(UserContext)


    useEffect(() => {
        getAllMovies()
    }, [])

    console.log(allMovies)

    return (
        <div className="main">
            <MovieForm />
            <MovieList movies={allMovies} />
        </div>
    );
}

export default Home;