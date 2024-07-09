import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";


function Navbar() {
    const { user, logout } = useContext(UserContext)
    return (
        <nav className="navbar">
            <h1>Movie Reviews</h1>
            <div>
                <Link className="nav-button" to='/home'><button>Home</button></Link>
                <Link className="nav-button" to='/profile'><button>{user.username}</button></Link>
                <button className="nav-button" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;