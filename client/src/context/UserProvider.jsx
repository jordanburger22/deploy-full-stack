import { createContext, useState } from "react";
import axios from "axios";


export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function UserProvider({ children }) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        movies: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    const [allMovies, setAllMovies] = useState([])

    async function signup(creds) {
        try {
            const res = await axios.post('/api/auth/signup', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/api/auth/login', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    token: "",
                    user: {}
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr() {
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg: ""
            }
        })
    }

    function getUserMovies() {
        userAxios.get('/api/main/movie/user')
            .then(res => setUserState(prevUserState => ({
                ...prevUserState,
                movies: res.data
            })))
            .catch(err => console.log(err))
    }

    function getAllMovies() {
        userAxios.get('/api/main/movie')
            .then(res => setAllMovies(res.data))
            .catch(err => console.log(err))
    }

    function addMovie(newMovie) {
        userAxios.post('/api/main/movie', newMovie)
            .then(res => {
                setAllMovies(prev => [...prev, res.data])
                setUserState(prev => ({ ...prev, movies: [...prev.movies, res.data] }))
            })
    }

    function leaveRating(rating, movieId) {
        userAxios.put(`/api/main/movie/rating/${movieId}`, rating)
            .then(res => setAllMovies(prev => prev.map(movie => movie._id !== movieId ? movie : res.data)))
            .catch(err => console.log(err))
    }

    function updateRating(rating, ratingId, movieId) {
        userAxios.put(`/api/main/movie/change-rating/${ratingId}`, rating)
            .then(res => setAllMovies(prev => prev.map(movie => movie._id !== movieId ? movie : res.data)))
            .catch(err => console.log(err))
    }

    function deleteMovie(movieId){
        userAxios.delete(`/api/main/movie/delete/${movieId}`)
        .then(() => setAllMovies(prev => prev.filter(movie => movie._id !== movieId)))
        .catch(err => console.log(err))
    }

    function editMovie(movieId, update){
        userAxios.put(`/api/main/movie/edit/${movieId}`, update)
        .then(res => setAllMovies(prev => prev.map(movie => movie._id !== movieId ? movie : res.data)))
        .catch(err => console.log(err))
    }

    return (
        <UserContext.Provider value={{
            ...userState,
            allMovies,
            signup,
            login,
            logout,
            resetAuthErr,
            getUserMovies,
            getAllMovies,
            addMovie,
            leaveRating,
            updateRating,
            deleteMovie,
            editMovie
        }}>
            {children}
        </UserContext.Provider>
    )
}