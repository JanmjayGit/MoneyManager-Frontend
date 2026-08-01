import { ArrowBigRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const Transactions = ({Transactions, onMore, type, title }) => {
  return (
    <div className='card bg-gray-900 text-gray-200 rounded-xl border border-gray-700 p-6'>
        <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg text-white'>{title}</h5>
            <button className='card-btn text-gray-300 hover:text-white flex items-center gap-1' onClick={onMore}>
                More<ArrowBigRight className='text-base' size={16} />
            </button>
        </div>

        <div className='mt-6'>
            {(Transactions || []).slice(0,5)?.map(item => (
                <TransactionInfoCard 
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM, YYYY")}
                    amount={item.amount}
                    type={type}
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default Transactions
