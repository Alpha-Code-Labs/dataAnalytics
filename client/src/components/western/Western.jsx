import CustomLineChart from "../common/CustomLineChart";
import blazerData1 from '../../data/blazerAverage.json'
import blazerData2 from '../../data/blazerAverage2.json'
import blazerData3 from '../../data/blazerAverage3.json'
import ClubbedItems from "./clubbedItems";
import Tile from "../common/Tile";


export default function Western(props){

    const data = props.data

    const clubbedItemsData = {
        subCategory: 'Blazzers',
        mass:{
            brandCount:127,
            avgPrice:2500,
            graphData:blazerData2
        },

        lux:{
            brandCount:4,
            avgPrice:8700,
            graphData:blazerData2
        }
    }

    return(<>

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

        

        <ClubbedItems data={clubbedItemsData} />
        <ClubbedItems data={clubbedItemsData} />
        
        
    </>)
}