import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

const defaultData = [
  {
    y_val: "Page A",
    uv: 4000,
    x_val: 2400,
    amt: 2400
  },
  {
    y_val: "Page B",
    uv: 3000,
    x_val: 1398,
    amt: 2210
  },
  {
    y_val: "Page C",
    uv: 2000,
    x_val: 9800,
    amt: 2290
  },
  {
    y_val: "Page D",
    uv: 2780,
    x_val: 3908,
    amt: 2000
  },
  {
    y_val: "Page E",
    uv: 1890,
    x_val: 4800,
    amt: 2181
  },
  {
    y_val: "Page F",
    uv: 2390,
    x_val: 3800,
    amt: 2500
  },
  {
    y_val: "Page G",
    uv: 3490,
    x_val: 4300,
    amt: 2100
  }
];

export default function CustomLineChart(props) {
    const data = props.data || defaultData
    const average = props.average
    const yLabel = props.yLabel
    const xLabel = props.xLabel

  return (
    <LineChart
        width={350}
        height={200}
        data={data}
        margin={{
            top: 5,
            right: 5,
            left: 10,
            bottom: 25
        }}
        >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis label={{ value: xLabel, angle: 0, offset:5, position: 'bottom' }} dataKey="x_val" interval={15} />
        <YAxis label={{ value: yLabel, angle: -90, offset:-15, position: 'left', textAnchor: 'middle' }} />
        <Tooltip />
        
        <ReferenceLine x={average} stroke="red" label="Max PV PAGE" />
        <Line
            type="monotone"
            dataKey="y_val"
            stroke="#8884d8"
            dot={false}
            //activeDot={{ r: 8 }}
        />
    </LineChart>
  );
}
