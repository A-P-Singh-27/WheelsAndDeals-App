import React from 'react'
import { LuChevronsUpDown } from "react-icons/lu";
import { RxDropdownMenu } from "react-icons/rx";

function DropdownField({ label, name, type, options, required, icon, handleInputChange, carinfo }) {
    return (
        <div>
            <div className="relative mt-1.5">
                <label
                    className="peer relative block text-gray-500 focus-within:font-bold"
                // Replaced `peer-focus` with `focus-within` and removed `htmlFor` as input is now nested
                >
                    {label}<span className='text-red-500 font-bold'>*</span>

                    <div className='relative'>
                    <input
                        type="text"
                        list={label}
                        required={required}
                        id={name}
                        defaultValue={carinfo?.[name]}
                        onChange={(e)=>handleInputChange(name , e.target.value)}
                        className="peer-input w-full mt-1 rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0 placeholder:text-gray-400 placeholder:font-normal"
                        // Removed redundant peer class and adjusted nesting
                        // Added the peer class to make peer-focus styling work for the label
                        placeholder={`Select ${label}`}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <RxDropdownMenu className="text-gray-500" />
                    </span>
                    </div>
                </label>

            </div>

            <datalist name={name} id={label}>
                {options?.map((option, index) => (
                    <option value={option}>{option}</option>
                ))}
            </datalist>


        </div>
    )
}

export default DropdownField