import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList
  } from "recharts";
  


export default function CustomBarChart(props){
    
    const data = props.data
    console.log(data)

    return(<>
    
    <div className="relative">
        <BarChart
        width={700}
        height={300}
        data={data}
        margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 25
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='subCat' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Regular" stackId="a" fill="#8884d8" barSize={15} >
        </Bar>
        <Bar dataKey="Plus Size" stackId="a" fill="#82ca9d" barSize={15}>
        </Bar>
        
        </BarChart>

        <div className="absolute -left-[28px] top-[94px] -rotate-90">
            <p className="text-sm text-gray-400">Number of Brands</p>
        </div>

    </div>
    
    </>)
}