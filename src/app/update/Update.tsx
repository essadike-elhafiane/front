"use client"
import React, { useContext } from 'react';
import '@/styles/login/styles.css'
import '@/styles/update/update.css'
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UpdateForm from './UpdateForm';
import UpdateUserData from '@/components/context/update.context';

const UpdatePage = () => {

    const context = useContext(UpdateUserData);
    const [imageSrc, setImageSrc] = useState(context?.image? context.image : "./defaultImg.svg");
    const [file, setFile] = useState<File | null>(null);
    // const router = useRouter();
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        setImageSrc(file ? URL.createObjectURL(file) : "./defaultImg.svg");
        setFile(file || null);
    };

    // const sendImg = () => {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         if (context?.userName) {
    //             formData.append("userName", context.userName);
    //         }
    //         fetch(process.env.NEST_API + '/upload', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Accept': 'form-data',
    //             },
    //             credentials: 'include',
    //         })
    //         .then(Response => {
    //             if (!Response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             router.push('/');
    //         })
    //         .then(data => {
    //             //console.log('Success:', data);
    //             // router.push('/');
    //         })
    //         .catch((error) => {
    //             // //console.error('Error:', error);
    //         });
    //     }
    // }
   

    return (
    <>
    <main className="main">
        <div className="update-container">
            <div className="logo">
                <Image
                    src={'./Vector.svg'}
                    alt="logo"
                    width={50}
                    height={50}
                    style={{
                        maxWidth: "100%",
                    }} />
                <h1>P<span>O</span>NGy</h1>
            </div>
            <h1 id="Laststeps">Last steps</h1>
            <div className='update-row'>

                <UpdateForm file={file}/>

                <div className='update-row-image'>
                    <Image className='UpdatedPhoto' src={imageSrc} alt="Pongy" style={
                        {
                            borderRadius: "50%",
                            objectFit: "cover",
                        }
                    } width={100} height={100} priority={true} />
                    <Image className='updateLogo' src="./update.svg" alt="upload" width={10} height={10} priority={true} />
                    <input type="file" id="ImageInput" onChange={handleFileChange} style={{ display: "none" }} />
                    <label htmlFor="ImageInput" className="update-botton" >
                        Update
                    </label>
                </div>
            </div>    
        </div>
    </main>
    </>
    );
}

export default UpdatePage;