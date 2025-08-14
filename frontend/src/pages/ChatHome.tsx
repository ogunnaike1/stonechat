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
                        <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                        <span>usman ogunnaike</span>
                        <span className='text-blue-950 px-[15px]'><FaChevronRight /></span>
                    </div>
                </div>
            </div>

            <div className='h-[13vh] bg-white'>
               <div className='w-[90%] mx-auto flex justify-between items-center h-[100%]'>
                    <div className='flex gap-[20px] items-center'>
                                    <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                                    <span>usman ogunnaike</span>
                    </div>
                    <span className='text-[20px]'><BsThreeDotsVertical /></span>

               </div>
               

            </div>

            <div className='bg-[#EDF0F9] h-[72vh]'>

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

            <div className='bg-[#F3F4F6]'>


                    <div className='flex h-[10vh] py-[10px]  justify-between w-[90%] mx-auto border-t-[1px] border-[#B2B2B3]'>
                        <div className='flex gap-[15px] items-center'>
                        <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                            <div className='flex flex-col bg-amber-400 h-[100%] justify-between'>
                                <span className=' text-[#404872] text-[18px] font-[600] '>Usman ogunnaike</span>
                                <span className='truncate w-[300px] bg-amber-50 text-[#B2B2B3] text-[14px]'>hey pretty girl hey pretty girlhey pretty girlhey pretty girl</span>
                            </div>
                        </div>

                        <span className='text-[16px] text-blue-500'>8:08 pm</span>
                    </div>
                

               

            </div>

        </div>
 
    </div>
  )
}

export default ChatHome