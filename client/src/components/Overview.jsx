import CustomPieChart from "./common/CustomPieChart";

export default function Overview(props) {

    const innerdata = [
        { name: 'Indian & Fusion Wear', value: 1809 },
        { name: 'Western Wear', value: 1841 },
        { name: 'Lingerie & Sleep Wear', value: 804 },
      ];

  return (
    <>
        <CustomPieChart data={innerdata} />
    </>
)}