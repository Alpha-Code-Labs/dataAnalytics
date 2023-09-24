import CustomLineChart from "./CustomLineChart"

export default function Item(props){

    const data = props.data
    const brandCount = data.brandCount
    const classType = props.classType
    const avgPrice =  Math.floor(data.avg)
    const graphData = data.graphData
    const minPrice = data.minPrice
    const maxPrice = data.maxPrice 
    const onItemClick = props.onItemClick
    const categoryHeader = props.categoryHeader
    const category = props.category
    const subCategory = props.subCategory

    const clickProps = {categoryHeader, category, subCategory, classType}

    return(
    <>
            <div className="mb-10 ml-10 mt-4 w-fit cursor-pointer" onClick={()=>{onItemClick(clickProps)}}>
                <p className="mt-2 text-lg text-slate-600 hover:text-indigo-600">{classType}</p>
            </div>
            <div className="flex  justify-center w-[100%] wrap mb-2 cursor-pointer" onClick={()=>{onItemClick(clickProps)}}>
                <div className="flex w-1/3 md:mb-10 items-center gap-4">
                
                    <div className="grid grid-cols-2 grid-rows-2">
                        <Tile text='Brands' val={brandCount} /> 
                        <Tile text='Minimum Price' val={minPrice} />
                        <Tile text='Average' val={avgPrice} />
                        <Tile text='Maximum Price' val={maxPrice} />
                    </div>
                </div>
                <CustomLineChart 
                    data={graphData}  
                    yLabel='No. of Brands' 
                    xLabel='Average Price' />
            </div>
    </>
    )
}


function Tile(props){
    const text = props.text
    const val = props.val

    return(
        <div className="flex flex-col justify-center shadow-sm w-fit h-fit py-2 px-6 ">
            <p className="text-xl px-.5 font-semilight text-slate-900 ">{val}</p>
            <p className=" text-sm text-mdwhitespace-nowrap font-semilight text-ellipsis overflow-hidden text-slate-500 hover:text-indigo-600">{text}</p>
        </div>
    )
}