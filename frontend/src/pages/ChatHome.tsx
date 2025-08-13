import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const ChatHome = () => {
  return (
    <div className='flex'>
        <div className='w-[70vw]'>
            <div className='h-[15vh] w-full !bg-blue-500 flex justify-between items-center text-white'>
                <span className='ml-[25px] text-[25px]'><RxHamburgerMenu /></span>
                <div className='flex gap-[20px]'>
                    <span className='px-[30px] border-r-[2px] border-blue-800 '>Homepage</span>
                    <div className='flex gap-[20px] items-center'>
                        <img className='h-[35px] w-[35px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                        <span>usman ogunnaike</span>
                        <span className='text-blue-950 px-[15px]'><FaChevronRight /></span>
                    </div>
                </div>
            </div>

        </div>
        
         {/* Second div */}
        <div className='w-[30vw]'>
            <div className='h-[15vh] w-full  !bg-blue-700 '>
                <div className='text-white flex w-[90%] pt-[10px] mx-auto items-center justify-between'>
                    <span className='text-[20px] font-[700]'>STONECHAT</span>

                    <div className='flex items-center '>
                        <span className='text-[20px]'><FaPlus /></span>
                        <span className='text-[20px]'><BsThreeDotsVertical /></span>
                    </div>

                </div>
                 {/* Search div */}
                <div className='w-[90%] mt-[10px] mx-auto bg-white h-[40px] px-[15px] flex items-center rounded-[20px]'>
                <span className='text-[22px]'><IoMdSearch /></span>
                <input className=' w-[70%] outline-0 h-[80%] ml-[10px] ' type="text" placeholder='Search for a chat' />
                
                </div>
            </div>

        </div>
 
    </div>
  )
}

export default ChatHome