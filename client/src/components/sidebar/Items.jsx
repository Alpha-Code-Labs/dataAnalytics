import { useEffect, useState } from "react"

export default function Items(props){
    const text = props.text
    const handleItemClick = props.handleItemClick
    const activeItem = props.activeItem

    const prm = text.split(' ')[0].toLowerCase()
    
    const [active, setActive] = useState(prm==activeItem)
    
    useEffect(()=>{
        setActive(prm==activeItem)
    }, [activeItem])

    return(
        <div className={`w-[244] h-[40px] ${active? 'bg-slate-200' : 'bg-white' }  cursor-pointer text-gray-600 hover:text-gray-600 hover:bg-slate-100 flex items-center px-6 rounded`} onClick={()=>{handleItemClick(prm)}}>
            <div className={`${text=='Overview'? 'text-md' : 'text-md' }`}>
                {text}
            </div>
        </div>
    )
}