import React, {useState} from 'react';
import {motion} from 'framer-motion';

const FormInput = ({
                       label,
                       type = 'text',
                       name,
                       value,
                       onChange,
                       error,
                       required = false,
                       placeholder,
                       disabled = false,
                   }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <motion.div
                className={`relative ${error ? 'animate-shake' : ''}`}
                animate={{
                    scale: isFocused ? 1.02 : 1,
                }}
                transition={{duration: 0.2}}
            >
                <input
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-primary-500'
                    } ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                />
                {error && (
                    <motion.p
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        className="text-red-500 text-xs mt-1 text-left"
                    >
                        {error}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default FormInput; 