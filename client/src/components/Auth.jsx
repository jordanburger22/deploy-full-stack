import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import AuthForm from "./AuthForm";




function Auth() {

    const { login, signup, errMsg, resetAuthErr } = useContext(UserContext)

    const [isMemeber, setIsMember] = useState(true)

    const toggleForm = () => {
        setIsMember(!isMemeber)
        resetAuthErr()
    }


    return (
        <div className="auth-container">
            {
                isMemeber ?
                    <AuthForm
                        submit={login}
                        btnText='Login'
                    />
                    :
                    <AuthForm
                        submit={signup}
                        btnText='Signup'
                    />
            }
            <p style={{ color: 'red' }}>{errMsg}</p>
            <button onClick={toggleForm}>{isMemeber ? 'Create an account?' : 'Need to Login?'}</button>
        </div>
    );
}

export default Auth;