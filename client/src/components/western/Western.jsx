import { useEffect, useState } from "react";
import ClubbedItems from "../common/ClubbedItems";
import Tile from "../common/Tile";
import SubCatDetails from "../common/SubCatDetails";


export default function WesternCopy(props){

    const data = props.data
    const clubbedItemsData = []
    for(const subCategory in data){
      clubbedItemsData.push({...data[subCategory], subCategory, categoryHeader: 'Western'})
    }
    
    const [showDetails, setShowDetails] = useState(false)
    const [itemDetailsData, setItemDetailsData] = useState([])
  
    const onItemClick = ({subCategory, classType}) =>{
      const type = classType == 'Mass' ? 'mass' : 'lux' 
      setItemDetailsData(data[subCategory][type].brands)
      setShowDetails(true)
    }

    const [loading, setLoading] = useState(true)

    console.log('rendering started')
    const start = Date.now()

    useEffect(()=>{
        console.log('rendering complete ', Date.now()-start)
        setLoading(false)
    },[])
        
    return(<>

        {loading && <div className="w-[100%] h-[100%] bg-white">loading...</div>}

        <div className="w-[90%] gap-1 flex justify-center items-center mt-6">            
            
            <div className="w-1/3">
                <Tile text='Total Brands' val='1100' /> 
            </div>
            <div className="w-1/3">
                <Tile text='Total Products' val='170' /> 
            </div>
            <div className="w-1/3">
                <Tile text='Average Price' val='2170' /> 
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