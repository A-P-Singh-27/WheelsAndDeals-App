import React from 'react'

function TextArea({ label, name, type, options, required, icon, handleInputChange,carinfo }) {
    console.log(name);
    
    return (
        <div>
            <label htmlFor="OrderNotes" className='text-gray-500 focus-within:font-bold transition-all duration-200'>{label} <span className='text-red-500 font-bold'>*</span>
            <textarea
                id="OrderNotes"
                className="peer w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm placeholder:text-gray-400 placeholder:font-normal border-b-2 focus:border-blue-500 focus:outline-none transition-all duration-300"
                rows="4"
                defaultValue={carinfo?.[name]}
                placeholder="Enter any additional Listing notes..."
                onChange={(e)=>handleInputChange(name , e.target.value)}
                required={required}
            ></textarea></label>
        </div>
    )
}

export default TextArea