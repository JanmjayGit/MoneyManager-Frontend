import EmojiPicker from 'emoji-picker-react';
import { Image, X } from 'lucide-react';
import React, { useState } from 'react'

const EmojiPickerPopup = ({icon, onSelect}) => {

    const[isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    
  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div
            onClick={() => setIsOpen(true)} 
            className='flex items-center gap-4 cursor-pointer'>
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-gray-700 text-white rounded-lg'>
                    {icon ? (
                        <img src={icon} alt="Icon" className='w-12 h-12' />
                    ) : (
                        <Image />
                    ) }
                    
                </div>
            <p className='text-gray-300'>{icon ? "Change icon" : "Pick icon"}</p>
        </div>
                    
            {isOpen && (
                <div className='relative'>
                    <button
                        onClick={() => setIsOpen(false)} 
                        className='w-7 h-7 flex items-center justify-center bg-gray-900 text-white border border-gray-700 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'>
                        <X />
                    </button>
                        <EmojiPicker 
                            isOpen={isOpen}
                            onEmojiClick={handleEmojiClick}
                        />
                </div>
            )}
            
    </div>
  )
}

export default EmojiPickerPopup;
