import axios from "axios";
import { useDebugValue, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCurrUser } from "../store/userSlice";

const LoginForm = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        axios.post(
            'http://localhost:4000/api/v1/users/login/', 
            {
                email: email,
                password: password
            },
        )
        .then(
            (res) => {
                Cookies.set("REFRESH TOKEN", res.data?.data.refreshToken)
                setEmail('')
                setPassword('')
                dispatch(setCurrUser({
                    type: 'user/setCurrUser',
                    user: res.data.data
                }))
                navigate('/')
            }
        )
    }

    return (
        <>
            <div className="max-w-5xl mx-auto">
                <form action="" className="my-4 w-max-4xl mx-auto p-10 border-b" onSubmit={ event => handleLogin(event) }>
                    <div className="mb-4">
                        <label htmlFor="" className="">Email</label>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            value={ email } 
                            onChange={ event => setEmail(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="mb-2">Password</label>
                        <input 
                            type="password" 
                            name="" 
                            id="" 
                            value={ password } 
                            onChange={ event => setPassword(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <button type="submit" className="border-2 border-indigo-600 bg-indigo-600 text-white w-full p-2 text-lg rounded-lg hover:bg-indigo-700 hover:border-indigo-700">Login</button>
                </form>
                <div className="flex justify-center space-x-2 text-lg">
                    <h1>Not a member? </h1><Link to={'/signin/'}><span className="font-semibold text-indigo-600">Signup Now</span></Link>
                </div>
            </div>
        </>
    )
}

export default LoginForm;