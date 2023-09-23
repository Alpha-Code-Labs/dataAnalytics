import Items from "./Items";
import { useState } from "react";




export default function Sidebar(props){

    const handleItemClick = props.handleItemClick
    const activeItem = props.activeItem

    

    return(
        <div className="w-[244px] h-full fixed  bg-white shadow-sm">
        
            <div className="w-[244] h-[100px]  mb-4" >
            </div>

            <div className="flex flex-col gap-1">
                <Items text='Overview' activeItem={activeItem} handleItemClick={handleItemClick} />
                <hr />
                <p className="text-lg text-gray-400 pl-6 py-2">Categories</p>
                <hr />
                <p></p>
                <Items text='Indian & Fusion Wear' activeItem={activeItem} handleItemClick={handleItemClick} />
                <Items text='Western Wear' activeItem={activeItem} handleItemClick={handleItemClick} />
                <Items text= 'Lingerie & Sleep Wear' activeItem={activeItem} handleItemClick={handleItemClick} />
            </div>

    
        </div>
    )
}