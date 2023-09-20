import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const url = 'http://localhost:8001/api/brands?categoryHeader=Indian & Fusion Wear&'
  const [data, setData] = useState(0)

  return (
    <>
      <div className='w-[100vw] h-[100vh] m-0 px-[20vw] bg-slate-100' >
          <div>
            <select>
              <option>Category</option>
              <option>Indian & Fusion Wear</option>
              <option>Western Wear</option>
              <option>Lingerie & Sleepware</option>
            </select>
          </div>
          <div>
            <select>
              <option></option>
              <option>Indian & Fusion Wear</option>
              <option>Western Wear</option>
              <option>Lingerie & Sleepware</option>
            </select>
          </div>
      </div>
    </>
  )
}

export default App
