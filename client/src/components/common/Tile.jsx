export default function Tile(props){
    const text = props.text
    const val = props.val

    return(
        <div className="flex flex-col bg-white items-center shadow-md max-w-[270px] py-2 px-16 rounded">
            <p className="text-xl font-medium font-monteserrat text-slate-600">{val}</p>
            <p className="text-sm font-thin  whitespace-nowrap text-ellipsis overflow-hidden text-slate-400">{text}</p>
        </div>
    )
}