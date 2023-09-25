import { useState } from "react"
import ClubbedItems from "../common/ClubbedItems"
import Tile from "../common/Tile"
import SubCatDetails from "../common/SubCatDetails"

export default function IndieFusion(props){
  const data = props.data
  
  const categories = []

  for(const category in data){
    const clubbedItemsData = []
    for(const subCategory in data[category]){
      clubbedItemsData.push({...data[category][subCategory], category, subCategory, categoryHeader: 'Indian & Fusion Wear'})
    }
    categories.push({categoryName: category, clubbedItemsData})
  }


  
  const [showDetails, setShowDetails] = useState(false)
  const [itemDetailsData, setItemDetailsData] = useState([])

  const onItemClick = ({categoryHeader, category, subCategory, classType}) =>{
    const type = classType == 'Mass' ? 'mass' : 'lux' 
    setItemDetailsData(data[category][subCategory][type].brands)
    setShowDetails(true)
  }


      
  return(<>

      <div className="w-[90%] gap-1 flex justify-center items-center mt-6">            
    
          <div className="w-1/3">
              <Tile text='Total Brands' val='1830' /> 
          </div>

      </div>

      {
          categories.map(category=>{
            return(
              <>
                {category.clubbedItemsData.map(item=>{
                return(<ClubbedItems data={item} onItemClick={onItemClick} />)
              })}
              </>
            )
          }) 
      }

        
      {showDetails && 
      <div className="fixed w-[100%] h-[100%] bg-[#53535399] left-0 top-0">
        <SubCatDetails setShowDetails={setShowDetails} data={itemDetailsData} />
      </div> }

      
  </>)
}