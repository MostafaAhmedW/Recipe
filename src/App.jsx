import React from 'react'
import {createBrowserRouter, RouterProvider} from"react-router-dom"
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Notfound from './Components/Notfound/Notfound'
import RecipeDetails from './Components/RecipeDetails/RecipeDetails'
export default function App() {

  let router = createBrowserRouter([
{
  path: "" , element : <Layout/> , children : [

    {index: true , element: <Home/>},
    {path: "recipeDetails/:id" , element: <RecipeDetails/>},
    {path: "*" , element: <Notfound/>},
  ]
}
    
  ])

  return (
    <>
    <RouterProvider router={router} ></RouterProvider>
    
    </>
  )
}
