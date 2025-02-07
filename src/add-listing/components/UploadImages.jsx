import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";

// //Function to upload to cloudinary
// async function uploadFileToCloudinary(file, folder, quality) {
//   const options = { folder };
//   options.resource_type = "auto";
//   if (quality) {
//     options.quality = quality;
//   }
//   return await cloudinary.uploader.upload(file.tempFilePath, options);
// }
function UploadImages({selectedFileList , setSelectedFileList}) {

    
    const onFileSelected = (event)=>{
        const files = event.target.files
        // console.log(files);
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
                  setSelectedFileList((prev)=>[...prev , file])

        }
        
    }

    const uploadToServer = async () => {
        const formData = new FormData();
        selectedFileList.forEach((file) => formData.append('images', file));

        try {
            const response = await axios.post('/api/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadedImages(response.data.data);
            // alert('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Failed to upload images.');
        }
    };


    const onImageRemove = (image , index)=>{
        const result = selectedFileList.filter((item)=>item!=image);
        setSelectedFileList(result);
    }
            
    return (
        <div>
            <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {selectedFileList.map((image , index)=>(
                    <div key={index}>
                        <MdDeleteForever  
                        className='absolute m-2 text-lg text-red-600 block font-bold cursor-pointer' 
                        onClick={()=>onImageRemove(image, index)}/>

                        <img src={URL.createObjectURL(image)} 
                        alt="uploaded file image" 
                        className='w-full h-[130px] object-cover rounded-xl'/>
                    </div>
                ))}
                <label htmlFor="upload-images">
                    <div className='border rounded-xl border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                        <h2 className='text-lg text-center text-primary'>+</h2>
                    </div>
                </label>
                <input type="file" multiple={true} id='upload-images' onChange={onFileSelected} className='opacity-0' />  
            </div>
        </div>
    )
}

export default UploadImages