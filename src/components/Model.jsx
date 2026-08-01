import { X } from 'lucide-react';
import React from 'react'

const Model = ({isOpen, onClose, children, title}) => {

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm'>
        <div className='relative bg-gray-900 text-gray-200 rounded-xl shadow-2xl p-8 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto border border-gray-700'>
            {/* Model header */}
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-white'>
                    {title}
                </h3>
                <button 
                    type='button'
                    onClick={onClose}
                    className='text-gray-300 hover:text-white transition-colors duration-200'
                >
                    <X className='h-6 w-6'/>
                </button>
            </div>
            
            {/* Model body */}
            <div className='text-gray-200'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Model;

