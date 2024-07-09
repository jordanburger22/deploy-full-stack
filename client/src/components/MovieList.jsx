import Movie from "./Movie";



function MovieList({movies}) {

    const movieElements = movies.map(movie => {
        return(
            <Movie key={movie._id} {...movie}/>
        )
    })


    return ( 
        <div className="movie-list">
            {movieElements}
        </div>
     );
}

export default MovieList;