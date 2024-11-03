import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrUser } from "../store/userSlice";

const Header = () => {  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currUser } = useSelector(state => state.user)

    const handleLogout = async (event) => {
        const refresh_token = Cookies.get('REFRESH TOKEN')
        
        event.preventDefault()
        axios.post('http://localhost:4000/api/v1/users/logout/', { refresh_token })
        .then(
            res => {
                Cookies.remove('REFRESH TOKEN')
                dispatch(removeCurrUser({
                    'type': 'user/removeCurrUse'
                }))
                navigate('/')
            }
        )
    }

    

    return (
        <>
            <Link to={'/'}>
                <a href="" className="text-white font-medium text-lg">ChatApp</a>
            </Link>
            
            <div className="space-x-1">
                {
                    <>
                        {
                            currUser.username && <span className="text-white px-4 py-1">{ currUser?.username }</span>
                        }
                        {
                            currUser.username && <button className="text-white px-4 py-1 hover:bg-slate-600 hover:font-medium"  onClick={ event => handleLogout(event) }>Logout</button>
                        }
                        {
                            !currUser.username && <Link to={'/login/'}>
                            <button className="text-white px-4 py-1 hover:bg-slate-600 hover:font-medium" >Login</button>
                        </Link>
                        }
                        
                        
                    </>
                }
            </div>
        </>
    )
}

export default Header;