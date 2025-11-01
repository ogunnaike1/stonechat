import React, { useState, type ChangeEvent, type RefObject } from "react";
import { IoSendSharp } from "react-icons/io5";

type ChatInputProps = {
  message: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  textareaRef,
  handleInput,
  onSend,
}) => {
  return (
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
        <button
          onClick={onSend}
          className="text-blue-500 hover:bg-[#dbdada] text-[24px] px-2 py-2 rounded-full "
        >
          <IoSendSharp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
