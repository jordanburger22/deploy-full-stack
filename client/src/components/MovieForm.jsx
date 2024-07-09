import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";



function MovieForm() {

    const { addMovie } = useContext(UserContext)

    const initInputs = {
        title: '',
        genre: '',
        review: ''
    }

    const [formData, setFormData] = useState(initInputs)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addMovie(formData)
        setFormData(initInputs)
    }


    return (
        <form className="movie-form" onSubmit={handleSubmit}>
            <h2>Add Movie</h2>
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Movie name?"
            />
            <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
            >
                <option value="">Genre?</option>
                <option value="Horror">Horror</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Sci-fi">Sci-fi</option>
                <option value="Action">Action</option>
                <option value="Documentary">Documentary</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Crime">Crime</option>
                <option value="Mystery">Mystery</option>
                <option value="Musical">Musical</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Family">Family</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
                <option value="Sports">Sports</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Superhero">Superhero</option>

            </select>
            <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="What did you think?"
                rows={10}
                cols={35}
            />
            <button>Add Movie</button>
        </form>
    );
}

export default MovieForm;