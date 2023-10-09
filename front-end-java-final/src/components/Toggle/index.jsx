import React from 'react';

const Toggle = ({ name }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 scale-90 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-transparent dark:peer-focus:ring-pink-200 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            <span className="ml-2 font-medium text-gray-900 dark:text-gray-300 text-xs">{name}</span>
        </label>
    );
};

export default Toggle;
