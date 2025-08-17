import React, { useRef, useState, type ChangeEvent } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaRegWindowClose } from "react-icons/fa";


const ChatHome = () => {
    const [message, setMessage] = useState("");
    const [openedSidebar, setOpenedSidebar] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // reset to shrink
        textarea.style.height = `${textarea.scrollHeight}px`; // expand to fit content
      }
      setMessage(e.target.value);
    };
  return (
    <div className='flex'>
        <div className='w-[70vw] relative'>
            <div className='h-[15vh] w-full !bg-blue-500 flex justify-between items-center text-white'>
                <button onClick={()=>setOpenedSidebar(true)}  className='ml-[25px] text-[25px]'><RxHamburgerMenu /></button>
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

            <div className='bg-[#EDF0F9]  h-[72vh] pt-[30px]'>

                    <div className="flex-1 px-[25px] h-[55vh] overflow-y-auto space-y-4">
                    
                    {/* Response message (left) */}
                    <div className="flex items-start gap-[10px] ">
                    <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                    <div className="bg-white shadow-lg px-4 py-2 rounded-b-lg rounded-tr-lg  max-w-xs">
                        <p className="text-gray-800">
                        Hello! How can I help you today? 
                        </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                    </div>

                    {/* Sent message (right) */}
                    <div className="flex justify-end gap-[10px] items-start">
                    <span className="text-xs text-gray-400 mt-1">10:31 AM</span>
                    <div className="bg-blue-500 px-4 py-2 rounded-b-lg rounded-tl-lg shadow-lg max-w-xs">
                        <p className="text-white">
                        I want to know more about your services.
                        </p>
                    </div>
                  
                    <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
                    </div>

       
                </div>
                    {/* Send message input */}

                    <div className="w-full">
                        <div className="flex w-[80%] py-[5px] shadow-lg mx-auto items-center rounded-[8px] px-[20px] bg-white space-x-2 border border-transparent focus-within:border-blue-500 transition-colors duration-200">
                            <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleInput}
                            placeholder="Type your message..."
                            rows={1}
                            className="w-full resize-none overflow-y-auto outline-0 py-2"
                            style={{
                                minHeight: "2rem", // about 1 line
                                maxHeight: "4rem", // about 4 lines
                            }}
                            />
                            <button className="text-blue-500 hover:bg-[#dbdada] text-[24px] px-2 py-2 rounded-full ">
                            <IoSendSharp />
                            </button>
                        </div>
                    </div>
            </div>


            {/*sidebar */}
          {
            openedSidebar &&(
                <div className='w-[80px] bg-white h-[100vh] absolute top-0 pt-[10px]'>
                <div className='w-full flex flex-col items-center gap-[10px]'>
                    <div className='flex flex-col gap-[2px] items-center'>
                        <button onClick={()=>setOpenedSidebar(false)} className='text-[40px] text-[#9EA4BC] rounded-[10px] p-[8px] bg-gray-200'>
                        <FaRegWindowClose />
                        </button>
                        <span className='text-[#9EA4BC] text-[14px]'>Close</span>
                    </div>
                    <div className='flex flex-col gap-[2px] items-center'>
                        <button className='text-[40px] text-[#9EA4BC] rounded-[10px] p-[8px] bg-gray-200'>
                        <RiShoppingBag4Fill />
                        </button>
                        <span className='text-[#9EA4BC] text-[14px]'>chat</span>
                    </div>
                    <div className='flex flex-col gap-[2px] items-center'>
                        <button className='text-[40px] text-[#9EA4BC] rounded-[10px] p-[8px] bg-gray-200'>
                        <BsChatDotsFill />
                        </button>
                        <span className='text-[#9EA4BC] text-[14px]'>chat</span>
                    </div>
                </div>
            </div>

            )
          }
     

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
 
    </div>
  )
}

export default ChatHome


export const ChatMessages = () =>{
    return(
        <div className='flex h-[10vh] py-[10px] px-[10px]  justify-between w-[90%] rounded-[10px] hover:bg-[#dbdada] mx-auto border-t-[1px] border-[#d7d7d9]'>
        <div className='flex gap-[15px] items-center'>
        <img className='h-[40px] w-[40px] rounded-[50%]' src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg" alt="" />
            <div className='flex flex-col  h-[100%] justify-between'>
                <span className=' text-[#404872] text-[18px] font-[600] '>Usman ogunnaike</span>
                <span className='truncate w-[250px]  text-[#B2B2B3] text-[14px]'>hey pretty girl hey pretty girlhey pretty girlhey pretty girl</span>
            </div>
        </div>

        <span className='text-[16px] text-blue-500'>8:08 pm</span>
    </div>
    )
}