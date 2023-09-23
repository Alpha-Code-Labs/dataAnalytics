import CustomPieChart from "./common/CustomPieChart";

export default function Overview(props) {
    const innerdata = [
        { name: 'Indian & Fusion Wear', value: 1810 },
        { name: 'Western Wear', value: 1830 },
        { name: 'Lingerie & Sleep Wear', value: 803 },
      ];

  return (
    <>
        <CustomPieChart data={innerdata}/>
    </>
)}