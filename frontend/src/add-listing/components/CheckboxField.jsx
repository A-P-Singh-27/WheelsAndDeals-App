import React from 'react'

function CheckboxField({label , handleInputChange, carinfo}) {
    // console.log(carinfo);
    
     
    
    const containlabel = carinfo?.features.some(feature=>
        feature.title.includes(label)
    )
    // console.log('containlabel',containlabel);
    
    return (
        <fieldset>
            <div className="space-y-2">
                <label htmlFor={label} className="flex cursor-pointer items-start gap-4">
                    <div className="flex items-center">
                        &#8203;
                        <input type="checkbox" defaultChecked={containlabel} className="size-4 rounded border-gray-300" id={label} onChange={(e)=>handleInputChange(label , e.target.checked)}/>
                    </div>

                    <div>
                        <strong className="font-medium text-gray-900"> {label} </strong>
                    </div>
                </label>
            </div>
        </fieldset>
    )
}

export default CheckboxField