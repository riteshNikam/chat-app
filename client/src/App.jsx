import Header from './components/Header'
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setCurrUser, setUsers } from "./store/userSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch()

  useEffect(
    () => {
      axios.get('http://127.0.0.1:4000/api/v1/users/getusers/')
      .then(
        res => {
          dispatch(setUsers({
            type: "user/setUsers",
            users: res.data.data
          }))
        }
      )

      const refresh_token = Cookies.get('REFRESH TOKEN')
      
      if (refresh_token) {
        axios.post('http://127.0.0.1:4000/api/v1/users/getuser', 
          {
            refresh_token
          }
        )
        .then(
          res => {
            dispatch(setCurrUser({
              type: "user/setCurrUser",
              user: res.data.data
            }))
          }
        )
      }
    },
    [ ]
  )

  return (
    <>
      
        <div className="h-[6vh] flex items-center bg-black justify-between px-5">
          <Header></Header>
        </div>

        <Outlet></Outlet>
    
    </>
  )
}

export default App;