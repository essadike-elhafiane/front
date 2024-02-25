"use client";
"use strict";
import { useEffect, useState } from 'react';
import '../styles/login/landingPage.css';
import axios from 'axios';
import UserDataContext, { UserData } from '@/components/context';
import Home from './home/Home';
import { Loding } from './home/Loding';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';

export default function landingPage()
{
    const [data, setData] = useState<UserData | null>(null);
    
    const router = useRouter();

    useEffect(() => {
    const getdata = async () => {
            try {
                const ApiUrl = process.env.NEST_API;
                // //console.log('ApiUrl:', ApiUrl, process.env);
                //console.log('Success:', ApiUrl+ '/status');
                const res = await axios.get(ApiUrl + '/status', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (res.data === undefined || res.data === false || res.data === null) {
                    //console.log('Error:', res.data);
                    router.push('/login');
                }
                else
                    setData(res.data);
                } catch (error) {
                    //console.log('Error:', error);
                    router.push('/login');
                }
        }
        getdata();
    },[]);

    // useEffect(() => {
    //     const jwt = window.location.hash.split('=')[1];
    //     if (jwt) {
    //         sessionStorage.setItem('jwt', jwt); // Consider more secure storage options
    //         window.location.hash = '';
    //     }
    // }, []);
    
    return (
        <>
            <UserDataContext.Provider value={data}>
            {data? <Home/> : <Loding/>}
            </UserDataContext.Provider>
        </>
        );
}
// req.password