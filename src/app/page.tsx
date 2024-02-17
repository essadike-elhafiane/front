"use client";
import { useEffect, useState } from 'react';
import '../style/landingPage.css';
import BackGround from '@/components/bg';
import axios from 'axios';
import UserDataContext, { UserData } from '@/components/context';
import Home from './home/Home';
import { Loding } from './home/Loding';

// console.log('ApiUrl:', ApiUrl);

export default function landingPage()
{
    const [data, setData] = useState<UserData | null>(null);
    
    
    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl =  process.env.NEST_API;
                console.log('ApiUrl:', ApiUrl, process.env);
                console.log('Success:', ApiUrl+ '/status');
                const res = await axios.get(ApiUrl + '/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
                );
                setData(res.data);
                } catch (error) {
                    console.log('Error:', error);
                    window.location.href = '/login';
                }
        }
        setTimeout(() => {
            getdata();
        }, 0)
    },[]);
    
    return (
        <>
            <UserDataContext.Provider value={data}>
            {data? <Home/> : <Loding/>}
            </UserDataContext.Provider>
        </>
        );
}
// req.password