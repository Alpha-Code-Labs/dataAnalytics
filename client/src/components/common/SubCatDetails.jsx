import { useRef, useState, useEffect} from "react"
import close_icon from '../../assets/images/close_FILL0_wght200_GRAD0_opsz48.svg'
import arrow_down_icon from '../../assets/images/keyboard_arrow_down_FILL0_wght400_GRAD0_opsz48.svg'

  
export default function SubCatDetails(props){

    const data = props.data
    const ref = useRef(null)
    const setShowDetails = props.setShowDetails

    useEffect(() => {
        let flag = false
        const handleClick = (event) => {
            if(ref.current && !ref.current.contains(event.target)) {
                if(flag) setShowDetails(false)
                flag=true
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            console.log('removing listener..')
          document.removeEventListener('click', handleClick);
        };

      },[]);

    
    return(<>
        
        <div ref={ref} className="shadow-lg absolute bg-white left-[25%] top-[5%]  w-[50%] h-[90%]   rounded z-20 focus:outline-1 overflow-y-scroll"  >
            
            <div className="fixed w-[50%] h-[44px] left-[25%] top[5%] bg-white p-4 shadow-sm">
                <div className="flex gap-4">
                    <p className="text-md text-gray-600 w-1/2">Brand Name</p>
                    <p className="text-md text-gray-600 w-1/6">Min Price</p>
                    <p className="text-md text-gray-600 w-1/6">Max Price</p>
                    <p className="text-md text-gray-600 w-1/6">Average</p>
                </div>
            </div>

            <div className="pt-[50px] p-4">
                {data.map(brand=>{
                   return( 
                    <>
                   <div className="flex gap-2">
                        <p className="text-sm text-gray-600 w-1/2 ">{brand.brandName}</p>    
                        <p className="text-sm text-gray-600 w-1/6 text-center">{brand.min}</p>
                        <p className="text-sm text-gray-600 w-1/6 text-center">{brand.max}</p>
                        <p className="text-sm text-gray-600 w-1/6 text-center">{brand.avg}</p>
                    </div>
                    <hr></hr>
                    </>
                    )
                })}
            </div>        

        </div>
               
    </>)
}



