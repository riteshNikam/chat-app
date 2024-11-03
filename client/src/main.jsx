import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Body from './components/Body.jsx'
import LoginForm from './components/LoginForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}>
      <Route path='/' element={<Body></Body>}></Route>
      <Route path='/login/' element={<LoginForm></LoginForm>}></Route>
      <Route path='/signin/' element={<SignInForm></SignInForm>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
    

)
