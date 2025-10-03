import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const MessageList = () => {
  return (
    <div className='lg:w-[30vw] md:w-[50%] sm:w-[50%] w-[100%]'>
    <div className='md:h-[15vh] pb-[10px] w-full  !bg-blue-700 '>
        <div className='text-white flex w-[90%] pt-[10px] mx-auto items-center justify-between'>
            <span className='text-[20px] font-[700]'>STONECHAT</span>

            <div className='flex items-center '>
                <span className='sm:text-[20px] text-[16px]'><FaPlus /></span>
                <span className='sm:text-[20px] text-[16px]'><BsThreeDotsVertical /></span>
            </div>

        </div>
         {/* Search div */}
        <div className='w-[90%] sm:mt-[10px] mt-[20px] mx-auto bg-white h-[30px] sm:h-[40px] px-[15px] flex items-center  rounded-[10px] sm:rounded-[20px]'>
        <span className='text-[22px]'><IoMdSearch /></span>
        <input className=' w-[70%] outline-0 h-[80%] ml-[10px] ' type="text" placeholder='Search for a chat' />
        
        </div>
    </div>

    <div className='bg-[#F3F4F6] overflow-y-scroll h-[85vh] '>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
            < ChatMessages/>
    </div>

</div>
  )
}

export default MessageList

export const ChatMessages = () =>{
    return(
            <div className="flex h-[10vh] py-[10px]  px-[10px] justify-between sm:w-[90%] w-[100%] rounded-[10px] hover:bg-[#dbdada] mx-auto border-t border-[#d7d7d9]">
            {/* Left side: avatar + name + message */}
            <div className="flex gap-[15px] items-center min-w-0">
                <img
                className="h-[40px] w-[40px] rounded-full flex-shrink-0"
                src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
                alt=""
                />
                <div className="flex flex-col min-w-0">
                <span className="text-[#404872] text-[16px] sm:text-[18px] font-[600]">Usman Ogunnaike</span>
                <span className="truncate text-[#B2B2B3] text-[14px] sm:text-[14px]">
                    hey pretty girl hey pretty girl hey pretty girl hey pretty girl
                </span>
                </div>
            </div>

            {/* Right side: time */}
            <div className="sm:text-[16px] text-[12px] text-blue-500 whitespace-nowrap pl-2">8:08 pm</div>
            </div>

    )
}