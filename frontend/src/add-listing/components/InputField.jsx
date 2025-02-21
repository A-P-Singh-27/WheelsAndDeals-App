import React from 'react'

function InputField({ label , name , type , options=[], required , icon , handleInputChange, carinfo }) {
    
    return (
        <div>
            <label
                htmlFor={name}
                className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
            >
                <input
                    name={name}
                    type={type}
                    id={name}
                    required={required}
                    placeholder={name}
                    defaultValue={carinfo?.[name]}
                    onChange={(e)=>handleInputChange(name , e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-sm peer-focus:font-bold"
                >
                    {label}{required?<span className='text-red-500 font-bold'> *</span>: ''}
                </span>
            </label>
        </div>
    )
}

export default InputField