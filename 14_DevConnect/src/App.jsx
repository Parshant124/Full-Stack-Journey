import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {About, ComingSoon, Features, Home, Login, SignUp} from './Pages/index'
import Layout from './Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />}/>
      <Route path="features" element={<Features />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='comingsoon' element={<ComingSoon />}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
