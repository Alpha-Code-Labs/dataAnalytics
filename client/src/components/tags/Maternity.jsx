import plotData from '../../data/tagsData.json'
import CustomBarChart from '../common/CustomBarChart';




const data1 = plotData.maternityData['Western Wear'].categories.filter(item=> item['Plus Size']>0)
//const data2 = plotData.maternityData['Indian & Fusion Wear'].categories.filter(item=> item['Plus Size']>0)
const data3 = plotData.maternityData['Lingerie & Sleepwear'].categories.filter(item=> item['Plus Size']>0)

const data2 = []
for(const category in plotData.maternityData['Indian & Fusion Wear']){
  data2.push({
    categories: plotData.maternityData['Indian & Fusion Wear'][category].categories.filter(item=> item['Plus Size']>0),
    category,
  })
}

const handleClick = ()=>{

}


export default function App() {
  return (
  <>
    <div className='bg-white mt-4 mb-4 p-4 rounded shadow-sm'>
        <p className='text-xl text-gray-800 text-center mb-6' onClick={()=>handleClick('western')}>Western Wear - Maternity</p>
        <CustomBarChart  data={data1} />
    </div>


    <div className='bg-white mt-4 p-4 rounded shadow-sm'>
    <p className='text-xl text-gray-800 text-center mb-6'>Lingerie & Sleepwear - Maternity</p>
    <CustomBarChart  data={data3} />
    </div>

    {
      data2.map(data=>{
        
        if(data.categories.length>0)
        return(
          <div className='bg-white mt-4 p-4 rounded shadow-sm'>
              <p className='text-xl text-gray-800 text-center mb-1'>Indian & Fusion Wear - Maternity</p>
              <p className='text text-gray-600 text-center mb-6'>{data.category}</p>
              <CustomBarChart  data={data.categories} />
          </div>
        )
      })
    }
</>
  );
}


function tile(){
  return(
  <div>

  </div>
  )
}
