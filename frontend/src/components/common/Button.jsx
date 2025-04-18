import React from 'react';
import classNames from 'classnames';

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    size = 'medium',
                    className,
                    disabled = false,
                    type = 'button'
                }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'bg-transparent hover:bg-gray-100',
        link: 'bg-transparent text-blue-600 hover:underline'
    };

    const sizes = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg'
    };

    const buttonClasses = classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

export default Button; 