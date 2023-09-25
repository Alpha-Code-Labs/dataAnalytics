import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Lingerie from './components/lingerie/Lingerie'
import Western from './components/western/Western'
import IndieFusion from './components/indianAndFusion/IndieFusion'
import Overview from './components/Overview'
import PlusSize from './components/tags/PlusSize'
import Maternity from './components/tags/Maternity'
import SportsWear from './components/tags/SportsWear'

import brandsData from './data/data.json'

import axios from 'axios'




function App() {
  const url = 'http://localhost:8001/api/brands?categoryHeader=Indian & Fusion Wear&'
  const [data, setData] = useState([])

  const [displayIndieFusion, setDisplayIndieFusion] = useState(false)
  const [displayWestern, setDisplayWestern] = useState(false)
  const [displayLingerie, setDisplayLingerie] = useState(false)
  const [displayOverview, setDisplayOverview] = useState(true)
  const [displayPlusSize, setDisplayPlusSize] = useState(false)
  const [displaySportsWear, setDisplaySportsWear] = useState(false)
  const [displayMaternity, setDisplayMaternity] = useState(false)
  
  const [disableScroll, setDisableScroll] = useState(false)

  const [activeItem, setActiveItem] = useState('overview')



  const [loading, setLoading] = useState(false)


  const removeDisplayPage = ()=>{
    setDisplayIndieFusion(false)
    setDisplayWestern(false)
    setDisplayLingerie(false)
    setDisplayOverview(false)
    setDisplayPlusSize(false)
    setDisplaySportsWear(false)
    setDisplayMaternity(false)

  }

  const handleItemClick = (text)=>{

    console.log('text is: ', text)

    if(text == 'lingerie'){
      removeDisplayPage()
      setDisplayLingerie(true)
    }

    if(text == 'western'){
      removeDisplayPage()
      setDisplayWestern(true)
    }

    if(text == 'indian'){
      removeDisplayPage()
      setDisplayIndieFusion(true)
    }

    if(text == 'overview'){
      removeDisplayPage()
      setDisplayOverview(true)
    }


    if(text == 'plus'){
      removeDisplayPage()
      setDisplayPlusSize(true)
    }

    if(text == 'sports'){
      removeDisplayPage()
      setDisplaySportsWear(true)
    }

    if(text == 'maternity'){
      removeDisplayPage()
      setDisplayMaternity(true)
    }

    setActiveItem(text)
    setLoading(true)

  }

  useEffect(()=>{
    console.log('loading state update, ', loading)
  },[loading])
  


  return (
    <>
    
      <div className='relative flex flex-col'>
        <div className='w-[100%] min-h-[100vh] m-0 overflow-hidden flex'>
          <Sidebar handleItemClick={handleItemClick} activeItem={activeItem} />

                {<div className={`w-full ml-[244px] flex flex-col items-center bg-slate-100 overflow-x-hidden ${disableScroll && 'overScroll-none'}`}>
                {displayIndieFusion && <IndieFusion data={brandsData['Indian & Fusion Wear']} setLoading={setLoading} />}
                {displayWestern && <Western data={brandsData['Western Wear']} setLoading={setLoading} setDisableScroll={setDisableScroll} />}
                {displayLingerie && <Lingerie data={brandsData['Lingerie & Sleepwear']} setLoading={setLoading} />}
                {displayOverview && <Overview setLoading={setLoading} />}
                {displayPlusSize && <PlusSize />}
                {displaySportsWear && <SportsWear />}
                {displayMaternity && <Maternity />}

            </div>}

          </div>
      </div>

    </>
  )
}

export default App
