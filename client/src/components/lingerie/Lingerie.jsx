import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'A',
    c1: 3000,
    c2: 2400,
    c2: 1400,
  },
  {
    name: 'B',
    c1: 2000,
    c2: 1000,
    c3: 2210,
  },
  {
    name: 'C',
    c1: 1400,
    c2: 10100,
    c3: 1290,
  },
  {
    name: 'D',
    c1: 3120,
    c2: 4400,
    c3: 1000,
  }
];
export default function Lingerie(){
    return(<>
       <div className='p-8 bg-white'>
            <LineChart
                width={500} height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="c1" stroke="red" activeDot={{ r: 12 }} />
                <Line type="monotone" dataKey="c2" stroke="green" />
            </LineChart>
        </div>
    </>)
}