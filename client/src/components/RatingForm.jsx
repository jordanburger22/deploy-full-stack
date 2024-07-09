import { useState } from "react"


function RatingForm(props) {

    const {submit, movieId, currentRating, requestId} = props

    const [formData, setFormData] = useState({
        score: currentRating && currentRating.score || ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submit(formData, requestId, movieId)
        !currentRating && setFormData({ score: '' })
    }
    
    return ( 

        <form onSubmit={handleSubmit}>
                    <label>
                        {currentRating ? 'Change your Rating':'Leave your Rating:'}
                        <select
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                        >
                            <option value="0">0</option>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <button>Rate!</button>
                </form>

     );
}

export default RatingForm;