import { useState } from 'react'
import './App.css'
import TaskList from "./pages/Task"
import AddTask from "./pages/AddTask"

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList/>}/>
          <Route path='/AddTask' element={<AddTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
