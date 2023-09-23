import Item from "./Item"

export default function ClubbedItems(props){
    const data = props.data
    const subCategory = data.subCategory
    const categoryHeaderr = 'Western'
    
    return(
        <div className="mt-10 py-8 bg-white flex flex-col w-[90%] rounded-t-lg shadow-sm ">
            <div className="mb-6 ml-10">
                <p className="text-2xl text-slate-600">{subCategory}</p>
                <p className="text-md text-slate-400">{categoryHeaderr}</p>
            </div>
            <hr />
            <Item data={data.mass} classType='Mass' />
            <hr/>
            <Item data={data.lux} classType='Luxury'/>
        </div>

    )
}