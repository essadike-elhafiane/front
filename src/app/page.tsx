"use client";
"use strict";
import { useEffect, useState } from 'react';
import '../styles/login/landingPage.css';
import axios from 'axios';
import UserDataContext, { UserData } from '@/components/context';
import Home from './home/Home';
import { Loding } from './home/Loding';
import BackGround from '@/components/bg';
import { useRouter } from 'next/navigation';

export default function landingPage()
{
    const [data, setData] = useState<UserData | null>(null);
    
    const router = useRouter();
    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl =  process.env.NEST_API;
                // console.log('ApiUrl:', ApiUrl, process.env);
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
                    // router.push('/login');
                }
        }
        getdata();
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