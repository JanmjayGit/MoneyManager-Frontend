import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData, getExpenseStats } from '../util/chartDataHelper'; // Adjust path as needed
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, DollarSign, Calendar, BarChart3, IndianRupee } from 'lucide-react';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const result = prepareExpenseLineChartData(transactions);
            const expenseStats = getExpenseStats(transactions);

            console.log('Chart Data:', result);
            console.log('Expense Stats:', expenseStats);

            setChartData(result);
            setStats(expenseStats);
        }
    }, [transactions]);

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-white">{data.formattedDate}</p>
                    <div className="mt-2">
                        <p className="text-lg font-bold text-green-600">
                            ₹{data.dailyExpense?.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-300">
                            {data.transactionCount} transaction{data.transactionCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-gray-900 text-gray-200 rounded-lg shadow-lg border border-gray-700 p-6 mt-6'>
            {/* Header Section */}
            <div className='flex justify-between items-start mb-6'>
                <div>
                    <h5 className='text-2xl font-bold text-white mb-2'>
                        Expense Overview
                    </h5>
                    <p className='text-md text-gray-300'>
                        Track your spending and manage your budget effectively.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className='grid grid-cols-2 gap-4 text-right'>
                    <div className='bg-gray-800 p-3 rounded-lg'>
                        <div className='flex items-center justify-end gap-2'>
                            <IndianRupee className='w-4 h-4 text-emerald-500' />
                            <span className='text-sm text-emerald-500 font-medium'>Total</span>
                        </div>
                        <p className='text-lg font-bold text-emerald-500'>
                            ₹{stats.totalExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>

                    <div className='bg-gray-800 p-3 rounded-lg'>
                        <div className='flex items-center justify-end gap-2'>
                            <IndianRupee className='w-4 h-4 text-emerald-500' />
                            <span className='text-sm text-emerald-500 font-medium'>Average</span>
                        </div>
                        <p className='text-lg font-bold text-emerald-500'>
                            ₹{stats.averageExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className='mt-6'>
                {chartData.length > 0 ? (
                    <div className='w-full h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <defs>
                                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="dayName"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickLine={{ stroke: '#4B5563' }}
                                    axisLine={{ stroke: '#4B5563' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickLine={{ stroke: '#4B5563' }}
                                    axisLine={{ stroke: '#4B5563' }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />

                                {/* Smooth Area Chart */}
                                <Area
                                    type="monotone"
                                    dataKey="dailyExpense"
                                    stroke="#EF4444"
                                    strokeWidth={3}
                                    fill="url(#expenseGradient)"
                                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 5, stroke: '#111827' }}
                                    activeDot={{ r: 7, stroke: '#EF4444', strokeWidth: 2, fill: '#111827' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-64 text-gray-300'>
                        <Calendar className='w-12 h-12 mb-4 text-gray-500' />
                        <p className='text-lg font-medium'>No expense data available</p>
                        <p className='text-sm'>Add some expense transactions to see your overview</p>
                    </div>
                )}
            </div>

            {/* Additional Stats */}
            {chartData.length > 0 && (
                <div className='mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-700'>
                    <div className='text-center'>
                        <p className='text-sm text-gray-300'>This Month</p>
                        <p className='text-xl font-semibold text-white'>
                            ₹{stats.thisMonthExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>

                    <div className='text-center'>
                        <p className='text-sm text-gray-300'>Highest Expense</p>
                        <p className='text-xl font-semibold text-white'>
                            ₹{stats.highestExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>

                    <div className='text-center'>
                        <p className='text-sm text-gray-300'>Total Transactions</p>
                        <p className='text-xl font-semibold text-white'>
                            {stats.transactionCount || 0}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpenseOverview;
