import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Lingerie from './components/lingerie/Lingerie'
import Western from './components/western/Western'
import IndieFusion from './components/indianAndFusion/IndieFusion'
import Overview from './components/Overview'

import axios from 'axios'




function App() {
  const url = 'http://localhost:8001/api/brands?categoryHeader=Indian & Fusion Wear&'
  const [data, setData] = useState(0)

  const [displayIndieFusion, setDisplayIndieFusion] = useState(false)
  const [displayWestern, setDisplayWestern] = useState(false)
  const [displayLingerie, setDisplayLingerie] = useState(false)
  const [displayOverview, setDisplayOverview] = useState(true)

  const [activeItem, setActiveItem] = useState('overview')

  const handleItemClick = (text)=>{

    console.log('text is: ', text)

    if(text == 'lingerie'){
      setDisplayIndieFusion(false)
      setDisplayWestern(false)
      setDisplayLingerie(true)
      setDisplayOverview(false)
    }

    if(text == 'western'){
      setDisplayIndieFusion(false)
      setDisplayWestern(true)
      setDisplayLingerie(false)
      setDisplayOverview(false)
    }

    if(text == 'indian'){
      setDisplayIndieFusion(true)
      setDisplayWestern(false)
      setDisplayLingerie(false)
      setDisplayOverview(false)
    }

    if(text == 'overview'){
      setDisplayIndieFusion(false)
      setDisplayWestern(false)
      setDisplayLingerie(false)
      setDisplayOverview(true)
    }

    setActiveItem(text)

  }


  return (
    <>
    
      <div className='relative flex flex-col'>
        <div className='w-[100%] min-h-[100vh] m-0 overflow-hidden flex'>
          <Sidebar handleItemClick={handleItemClick} activeItem={activeItem} />
          
            <div className='w-full ml-[244px] flex flex-col items-center bg-slate-100 overflow-x-hidden'>
                {displayIndieFusion && <IndieFusion/>}
                {displayWestern && <Western/>}
                {displayLingerie && <Lingerie/>}
                {displayOverview && <Overview/>}
            </div>

          </div>
      </div>

    </>
  )
}

export default App
