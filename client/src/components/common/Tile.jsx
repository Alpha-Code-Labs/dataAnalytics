export default function Tile(props){
    const text = props.text
    const val = props.val

    return(
        <div className="flex flex-col bg-white items-center shadow-md max-w-[270px] py-2 px-16 rounded">
             <p className="text-xl px-.5 font-semilight text-slate-900">{val}</p>
            <p className=" text-sm text-mdwhitespace-nowrap font-semilight text-ellipsis overflow-hidden text-slate-500">{text}</p>
        </div>
    )
}