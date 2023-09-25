import ClubbedItems from "../common/ClubbedItems"
import Tile from "../common/Tile"
import { useState } from "react"
import SubCatDetails from "../common/SubCatDetails"

export default function Lingerie(props){
  const data = props.data
  const clubbedItemsData = []
  for(const subCategory in data){
    clubbedItemsData.push({...data[subCategory], subCategory, categoryHeader: 'Lingerie & Sleepwear'})
  }
  
      
  const [showDetails, setShowDetails] = useState(false)
  const [itemDetailsData, setItemDetailsData] = useState([])

  const onItemClick = ({subCategory, classType}) =>{
    const type = classType == 'Mass' ? 'mass' : 'lux' 
    setItemDetailsData(data[subCategory][type].brands)
    setShowDetails(true)
  }


  return(<>

      <div className="w-[90%] gap-1 flex justify-center items-center mt-6">            
          
          <div className="w-1/3">
              <Tile text='Total Brands' val='803' /> 
          </div>
        
      </div>

      {
          clubbedItemsData.map(item=><ClubbedItems data={item} onItemClick={onItemClick} />)
      }

      {showDetails && 
      <div className="fixed w-[100%] h-[100%] bg-[#53535399] left-0 top-0">
        <SubCatDetails setShowDetails={setShowDetails} data={itemDetailsData} />
      </div> }

      
  </>)
}