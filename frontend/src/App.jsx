import React, { useEffect, useState } from 'react'
import axios from "axios"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import QRCodeGenerator from './components/QrGen'

const router=createBrowserRouter([
  {
    path:"/",
    element:<QRCodeGenerator/>

  },
  
  

  



])
const App = () => {
 

  return (
    <RouterProvider router={router}/>
   )
    
}

export default App