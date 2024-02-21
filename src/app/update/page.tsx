"use client"

import React from 'react';
import '@/styles/login/styles.css'
import '@/styles/update/update.css'
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackGround from "@/components/bg"

const UpdatePage = () => {

    const [imageSrc, setImageSrc] = useState("./defaultImg.svg");
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        setImageSrc(file ? URL.createObjectURL(file) : "./defaultImg.svg");
        setFile(file || null);
    };
    const sendImg = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            fetch(process.env.NEST_API + '/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'form-data',
                },
                credentials: 'include',
            })
            .then(Response => {
                if (!Response.ok) {
                    throw new Error('Network response was not ok');
                }
                router.push('/');
            })
            .then(data => {
                //console.log('Success:', data);
                router.push('/');
            })
            .catch((error) => {
                // //console.error('Error:', error);
            });
        }
    }

    return (
        <>
        <BackGround/>
        <main className="main">
            <div className="container-upadte">
                <Image className='UpdatedPhoto' src={imageSrc} alt="Pongy" style={
                    {
                        borderRadius: "50%",
                        objectFit: "cover",
                    }
                } width={100} height={100} priority={true} />
                <Image className='img' src="./update.svg" alt="upload" width={10} height={10} priority={true} />
                <label htmlFor="ImageInput" className="input-image" >
                    Choose an Image
                </label>
                <input name='image' type="file" id="ImageInput" onChange={handleFileChange} accept="image/*"/>
                <input name='userName' className='input-update' type="text" placeholder="Username" />
                <input name='firstName' className='input-update' type="text" placeholder="firstName" />
                <input name='lastName' className='input-update' type="text" placeholder="lastName" />
                <input name='password' className='input-update' type="password" placeholder="Password" />
                <input name='Confirm Password' className='input-update' type="password" placeholder="Confirm Password" />
                <button className="input-button" onClick={sendImg} >Update</button>
            </div>
        </main>
        </>
    );

}

export default UpdatePage;