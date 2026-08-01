import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
    
  return (
    <div className='flex gap-6 bg-gray-900 text-gray-200 p-6 rounded-2xl shadow-md shadow-black/20 border border-gray-700'>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div className=''>
            <h6 className='text-sm text-gray-300 mb-1'>{label}</h6>
            <span className='text-[22px] text-white'>&#8377;{value}</span>
        </div>
    </div>
  )
}

export default InfoCard
