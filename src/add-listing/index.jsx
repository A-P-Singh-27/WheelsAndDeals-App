import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextArea from './components/TextArea';
import { Separator } from '@radix-ui/react-separator';
import features from './../Shared/features.json';
import CheckboxField from './components/CheckboxField';
import { Button } from '@/components/ui/button';
import UploadImages from './components/UploadImages';
import { useUser } from '@clerk/clerk-react';
import {  useNavigate, useSearchParams } from 'react-router-dom';

function AddListing() {
    const [formData, setFormData] = useState({});
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const [carinfo , setCarinfo] = useState();
    const { user } = useUser()
    const [searchparam] = useSearchParams();
    const navigate = useNavigate();
    // const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedFileList , setSelectedFileList]=useState([]);

    // console.log('searchparam' , searchparam);

    const mode = searchparam.get('mode');
    // console.log(mode);
    
    const recordId = searchparam.get('id');
    // console.log(recordId);

    useEffect(() => {
        if(mode=='edit'){
            GetListofCarById()
        }
    }, []);

    const GetListofCarById = async () => {
        try {
            const response = await fetch(`https://wheels-and-deals-backend.vercel.app/api/cars/getcarbyid?recordId=${recordId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }

            const result = await response.json();
            setCarinfo(result[0]);
            console.log('the car' , result);

            // alert('Listing fetched successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Error in fecthcing form . Please try again.');
        }
    }


    // console.log(user);


    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFeatureChange = (label, value) => {
        setSelectedFeatures((prevFeatures) => ({
            ...prevFeatures,
            [label]: value, // Track selected features by their label
        }));
    };
    function getIndianDateTime() {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        const indianDateTime = new Intl.DateTimeFormat('en-IN', options).format(new Date());
        return indianDateTime;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedFileList);
        
        const imageformData = new FormData();
    selectedFileList.forEach((file) => imageformData.append('images', file));
    for (const pair of imageformData.entries()) {
        console.log(pair[0], pair[1]); // Logs key-value pairs in FormData
    }
    let imagedata;
        
    try {
        const response = await fetch('https://wheels-and-deals-backend.vercel.app/api/cars/upload-images', {
            method: 'POST',
            body: imageformData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload images');
        }

        imagedata = await response.json();
        // setUploadedImages(data.data);
        console.log(imagedata.data);
        
        // alert('Images uploaded successfully!');
    } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images.');
    }

        // Combining form data with selected features into final data
        const finalData = {
            ...formData,
            features: Object.keys(selectedFeatures).map((key) => ({
                title: key,
                type: selectedFeatures[key],
            })),
            createdby: user?.primaryEmailAddress?.emailAddress,
            createdOn: getIndianDateTime(),
            username:user?.fullName,
            userImageUrl:user?.imageUrl,
            imageUrls: imagedata.data
        };

        console.log('Submitting data:', finalData);

        if (mode == 'edit') {
            
            try {
                const response = await fetch(`https://wheels-and-deals-backend.vercel.app/api/cars/updateListing?id=${recordId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
    
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                // alert('Listing added successfully!');
                navigate('/profile')
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Error submitting form. Please try again.');
            }
            

        }else{
            try {
                const response = await fetch('https://wheels-and-deals-backend.vercel.app/api/cars/addListing', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
    
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                alert('Your Car Details added successfully!');
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Error in submitting CarDetails. Please try again Later.');
            }
            }
    };



    return (
        <div>
            <Header />
            <div className="px-10 md:px-20 my-10">
                <h2 className="font-bold text-4xl">Add New Listing</h2>
                <form className="p-10 m-10 border rounded-xl ">
                    {/* Car Details */}
                    <div>
                        <h2 className="font-medium text-xl mb-6">Car Details</h2>
                        <div className="grid md:grid-cols-2 ld:grid-cols-2 gap-5 sm:grid-cols-1">
                            {carDetails.carDetails.map((item, index) => (
                                <div key={index}>
                                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                                        <InputField
                                            name={item.name}
                                            label={item.label}
                                            type={item.fieldType}
                                            options={item.options}
                                            required={item.required}
                                            icon={item.icon}
                                            handleInputChange={handleInputChange}
                                            carinfo={carinfo}
                                        />
                                    ) : item.fieldType === 'dropdown' ? (
                                        <DropdownField
                                            name={item.name}
                                            label={item.label}
                                            type={item.fieldType}
                                            options={item.options}
                                            required={item.required}
                                            icon={item.icon}
                                            handleInputChange={handleInputChange}
                                            carinfo={carinfo}
                                            />
                                        ) : item.fieldType === 'textarea' ? (
                                            <TextArea
                                            name={item.name}
                                            label={item.label}
                                            type={item.fieldType}
                                            options={item.options}
                                            required={item.required}
                                            icon={item.icon}
                                            handleInputChange={handleInputChange}
                                            carinfo={carinfo}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <hr className="my-6" />

                    {/* Features List (Updated to handle feature selection) */}
                    <div>
                        <h2 className="font-medium text-xl my-6">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {features.features.map((feature, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <CheckboxField
                                        carinfo={carinfo}
                                        label={feature.label}
                                        handleInputChange={(name, value) => handleFeatureChange(feature.label, value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Car Images */}
                    <Separator className="my-6" />
                    <hr className="my-6" />
                    <UploadImages selectedFileList={selectedFileList} setSelectedFileList={setSelectedFileList}/>

                    {/* Submit Button */}
                    <div className="mt-10 flex justify-end">
                        <Button type="submit" onClick={(e) => onSubmit(e)} className="rounded-2xl">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddListing;
