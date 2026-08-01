import { ArrowBigRight } from 'lucide-react';
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className='card bg-gray-900 text-gray-200 rounded-xl border border-gray-700 p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h4 className='text-lg font-medium text-white'>Recent Transactions</h4>
                <button className='card-btn text-emerald-500 flex items-center gap-1' onClick={onMore}>More
                    <ArrowBigRight className='text-emerald-500' size={16} />
                </button>
            </div>

            <div className='mt-6'>
                {(transactions || []).slice(0, 5)?.map(item => (
                    <div className='mb-3'>
                        <TransactionInfoCard
                            key={item.id || `transaction-${index}`}
                            title={item.title}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM, YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions;
