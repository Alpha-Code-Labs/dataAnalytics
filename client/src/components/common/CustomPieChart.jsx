import { PieChart, Pie, Cell } from "recharts";
import Tile from "./Tile";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CustomPieChart(props) {
    const data = props.data || [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
      ];
  return (
    <>
    <div className="bg-white w-[90%] relative rounded pt-0 pb-10 px-10 m-4 flex flex-col items-center">
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={110}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>

      <div className="flex flex-col gap-2 ml-4">
          {data.map((entry, index)=>{
              return(
                  <div className="flex gap-4 items-center">
                      <div className={`w-[20px] h-[20px] rounded-sm`} style={{backgroundColor:COLORS[index % COLORS.length]}} />
                      <div>
                        <p className="text-sm text-slate-500">{entry.name}</p>
                        <div className="-mt-.5 flex">
                          <p className="text-xs text-slate-400">Brands:</p>
                          <p className="text-xs text-slate-500">{entry.value}</p>
                        </div>
                      </div>
                  </div>
              )
          })}
      </div>

      <div className="absolute pt-4">
        <p>Over 1100 brands, selling across 1200 products</p>
      </div>
    </div>
    </>
  );
}
