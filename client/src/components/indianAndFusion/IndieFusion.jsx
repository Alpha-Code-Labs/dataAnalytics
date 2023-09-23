import { useState } from 'react';
import {PieChart, Pie, Tooltip} from 'recharts'
import CustomPieChart from '../common/CustomPieChart';

const innerdata = [
    { name: 'Indian & Fusion Wear', value: 1810 },
    { name: 'Western Wear', value: 1830 },
    { name: 'Lingerie & Sleep Wear', value: 803 },
  ];
  
  const outerdata = [
    { name: 'P1', value: 10 },
    { name: 'P2', value: 100 },
    { name: 'P3', value: 20 },
    { name: 'P4', value: 30 },
    { name: 'P5', value: 90 }
  ];
  

  const tabs = ['Dupatta & Shawls', 'Ethnic Wear', 'Jackets', 'Kurta & Suits', 'Kurtis, Tunics & Tops', 'Leggings Salwars & Churidars', 'Sarees', 'Skirts & Plazzos']

export default function IndieFusion(){

    const [activeTab, setActiveTab] = useState(tabs[0])

    return(<>
        <CustomPieChart data={innerdata} />
    </>)
}