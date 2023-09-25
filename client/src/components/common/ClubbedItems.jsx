import Item from "./Item"

export default function ClubbedItems(props){
    const data = props.data
    const subCategory = data.subCategory
    const categoryHeader = data.categoryHeader
    const category = data.category || null
    const onItemClick = props.onItemClick

    
    return(
        <div className="mt-10 py-8 bg-white flex flex-col w-[90%] rounded-t-lg shadow-sm ">
            <div className="mb-6 ml-10">
                <p className="text-2xl text-slate-800">{subCategory}</p>
                {category!=null && <p className="text-md text-slate-500">{category}</p>}
                <p className="text-md text-slate-500">{categoryHeader}</p>
            </div>
            <hr />
            <Item data={data.mass} categoryHeader={categoryHeader} category={category} subCategory={subCategory}  classType='Mass' onItemClick={onItemClick} />
            <hr/>
            {(data.lux!={} && data.lux!=null && data.lux.brands.length > 0) && <Item data={data.lux} categoryHeader={categoryHeader} category={category} subCategory={subCategory} classType='Luxury' onItemClick={onItemClick} />}
        </div>

    )
}