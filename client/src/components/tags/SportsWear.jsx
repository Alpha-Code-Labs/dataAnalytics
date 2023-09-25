import plotData from '../../data/tagsData.json'
import CustomBarChart from '../common/CustomBarChart';




const data1 = plotData.sportsWearData['Western Wear'].categories.filter(item=> item['Plus Size']>0)
//const data2 = plotData.sportsWearData['Indian & Fusion Wear'].categories.filter(item=> item['Plus Size']>0)
const data3 = plotData.sportsWearData['Lingerie & Sleepwear'].categories.filter(item=> item['Plus Size']>0)

export default function App() {
  return (
  <>
    <div className='bg-white mt-4 mb-4 p-4 rounded shadow-sm'>
        <p className='text-xl text-gray-800 text-center mb-6'>Western Wear - Sports Wear</p>
        <CustomBarChart  data={data1} />
    </div>


    <div className='bg-white mt-4 p-4 rounded shadow-sm'>
    <p className='text-xl text-gray-800 text-center mb-6'>Lingerie & Sleepwear - Sports Wear</p>
    <CustomBarChart  data={data3} />
    </div>

</>
  );
}
