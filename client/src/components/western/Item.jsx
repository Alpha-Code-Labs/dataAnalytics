import CustomLineChart from "../common/CustomLineChart"

export default function Item(props){

    const data = props.data
    const brandCount = data.brandCount
    const classType = props.classType
    const avgPrice = data.avgPrice
    const graphData = data.graphData
    

    return(
    <>
            <div className="mb-10 ml-10 mt-4">
                <p className="mt-2 text-lg text-slate-500">{classType}</p>
            </div>
            <div className="flex  justify-center w-[100%] wrap mb-2">
                <div className="flex w-1/3  md:mb-10 items-center gap-4">
                    <Tile text='Brands' val={brandCount} />
                    <Tile text='Average' val={avgPrice} />
                </div>
                <CustomLineChart data={graphData} average={2675} yLabel='No. of Brands' xLabel='Average Price' />
            </div>
    </>
    )
}


function Tile(props){
    const text = props.text
    const val = props.val

    return(
        <div className="flex flex-col items-center shadow-md w-fit h-fit py-2 px-6">
            <p className="text-xl font-medium text-slate-700">{val}</p>
            <p className=" text-sm text-mdwhitespace-nowrap font-thin text-ellipsis overflow-hidden text-slate-400">{text}</p>
        </div>
    )
}