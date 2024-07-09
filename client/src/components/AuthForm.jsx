import { useState } from 'react';

function AuthForm(props) {

    const initState = { username: '', password: '' }

    const [formData, setFormData] = useState(initState)

    const { btnText, submit } = props

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        submit(formData)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h3>Movie Review</h3>
            <input
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleChange}
            />
            <input
                placeholder='Password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            <button>{btnText}</button>
        </form>

    );
}

export default AuthForm;