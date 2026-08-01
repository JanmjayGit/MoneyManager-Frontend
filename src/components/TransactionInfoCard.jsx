import { Trash2, TrendingDown, TrendingUp, Layers } from 'lucide-react';
import React, { useState } from 'react'

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete, color }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getAmountStyles = () => type === 'income' ? "text-green-600" : "text-red-600";

  const getTypeIcon = () => type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />;

  const formatAmount = (amount) => {
    if (!amount) return ''
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const cardColor = color || 'bg-emerald-500'

  return (
    <div
      className='group relative bg-gray-900 border border-gray-700 rounded-xl p-4 hover:shadow-lg hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='absolute inset-0 bg-gray-500/5 rounded-xl'></div>

      {/* Transaction Icon */}
      <div className='relative flex items-start justify-between mb-3'>
        <div className={`p-3 ${cardColor} rounded-xl shadow-lg`}>
          {icon ? (
            icon.startsWith('http') ? (
              <img
                src={icon}
                alt={title}
                className='w-6 h-6 object-contain'
              />
            ) : (
              <span className='text-2xl' role="img" aria-label={title}>{icon}</span>
            )
          ) : (
            <Layers size={24} className='text-white' />
          )}
        </div>

        {/* Delete Button */}
        {!hideDeleteBtn && (
          <div className={`transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            <button
              onClick={onDelete}
              className='p-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-200'>
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Transaction Details */}
      <div className='relative space-y-3'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-white group-hover:text-emerald-500 transition-colors'>
            {title}
          </h3>
          <p className='text-sm text-gray-300'>
            {date}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${type === 'income'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}>
            {getTypeIcon()}
            <span className='capitalize'>{type}</span>
          </div>

          <div className='text-right'>
            <p className={`text-lg font-bold ${getAmountStyles()}`}>
              {type === 'income' ? '+' : '-'} {formatAmount(amount)}
            </p>
          </div>
        </div>

        {/* Progress bar for visual appeal */}
        <div className='w-full bg-gray-700 rounded-full h-1.5 mt-3'>
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ${cardColor}`}
            style={{ width: `${Math.min((amount || 1000) / 100000 * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className='absolute inset-0 bg-gray-500/0 group-hover:bg-gray-500/5 rounded-xl transition-all duration-300 pointer-events-none'></div>
    </div>
  )
}

export default TransactionInfoCard;
