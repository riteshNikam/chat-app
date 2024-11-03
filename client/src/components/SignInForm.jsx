import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";

const SignInForm = () => {

    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSIgnin = async (event) => {
        event.preventDefault()
        axios.post(
            'http://127.0.0.1:4000/api/v1/users/register/',
            { 
                firstname,
                lastname,
                username,
                email,
                password
            }
        )
        .then(
            res => {
                setPassword('')
                setFirstname('')
                setLastname('')
                setEmail('')
                setUsername('')

                dispatch(addUser({
                    type: "user/addUser",
                    user: res.data.data
                }))
                navigate('/login')
            }
        )
    }

    return (
        <>
            <div className="max-w-5xl mx-auto">
                <form action="" className="my-4 w-max-4xl mx-auto p-10" onSubmit={ event => handleSIgnin(event) }>
                    <div className="mb-4">
                        <label htmlFor="" className="">First Name</label>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            value={ firstname }
                            placeholder="Enter first name..."
                            onChange={ event => setFirstname(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="">Last Name</label>
                        <input 
                            type="text" 
                            name="" 
                            id=""
                            value={ lastname } 
                            placeholder="Enter last name..."
                            onChange={ event => setLastname(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="">Username</label>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            value={ username }
                            placeholder="Enter username..."
                            onChange={ event => setUsername(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="">Email</label>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            value={ email }
                            placeholder="Enter email..."
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
                            placeholder="Enter password..."
                            onChange={ event => setPassword(event.currentTarget.value) }
                            className="w-full p-2 border-2 rounded-lg text-lg" />
                    </div>
                    <button type="submit" className="border-2 border-indigo-600 bg-indigo-600 text-white w-full p-2 text-lg rounded-lg hover:bg-indigo-700 hover:border-indigo-700">Login</button>
                </form>
            </div>
        
        </>
    )
}

export default SignInForm;