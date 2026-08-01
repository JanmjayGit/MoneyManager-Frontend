import { Eye, EyeOff } from 'lucide-react';
import React from 'react'

const Input = ({ label, value = "", onChange, placeholder, type, isSelect, options = [] }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        onChange(e.target); // Pass only the target
    };

    return (
        <div className='mb-4'>
            <label className='text-[13px] text-white block mb-1'>{label}</label>
            <div className='relative'>

                {
                    isSelect ? (
                        <select
                            className='w-full bg-gray-700 outline-none border border-gray-600 rounded-md py-2 px-3 text-white leading focus:outline-none focus:border-emerald-500'
                            value={value || ""}
                            onChange={handleChange}
                        >
                            <option value="" className='bg-gray-700 text-white'>Select {label} </option>
                            {
                                options.map((option) => (
                                    <option key={option.value} value={option.value} className='bg-gray-700 text-white'>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </select>

                    ) : (<input
                        className='w-full bg-gray-700 border border-gray-600 outline-none rounded-md py-2 px-3 pr-10 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-emerald-500'
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        value={value || ""} // Prevent uncontrolled input warning
                        autoComplete={type === 'password' ? 'current-password' : ''}
                        onChange={handleChange} />)
                }

                {type === 'password' && (
                    <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                        {showPassword ? (
                            <Eye
                                size={20}
                                className='text-gray-400'
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <EyeOff
                                size={20}
                                className='text-gray-400'
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </span>
                )}
            </div>

        </div>
    )
}

export default Input;
