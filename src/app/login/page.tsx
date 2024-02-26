"use client";
"use strict";
import '@/styles/login/styles.css'
import Image from "next/image";
import Signup from '@/components/signup'
import React, { useEffect, useState } from 'react';
import Signin from '@/components/signin';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loding } from '../home/Loding';
import UpdateUserData from '@/components/context/update.context';
import Login from './login';
import Update from '../update/Update';



async function authIntra()
{
    window.location.href = process.env.NEST_API + '/api/auth/intra';
}

async function authGoogle()
{
  // const res = await axios.get(process.env.NEST_API + '/api/auth/google');
  // console.log('res:', res);
  window.location.href = process.env.NEST_API + '/api/auth/google';
}


function main()
{
  const router = useRouter(); 
  
  const [online, setonline] = useState(true);
  const [userData, setUser] = useState({userName: '', image: ''});
  const [needUpdate, setNeedUpdate] = useState(false);

    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl: string | undefined =  process.env.NEST_API;
                //console.log('ApiUrl:', ApiUrl , process.env);
                const res = await axios.get(ApiUrl + '/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
                );
                if (res.data) {
                  if (typeof window !== 'undefined') {
                    if (res.data.updated) {
                      router.push('/');
                    } else {
                      setUser(res.data);
                      setNeedUpdate(true);
                    }
                  }
                }
            } catch (error) {
                setonline(false);
            } 
        }
        getdata();
    },[]);


  
    return (
      <>
        <UpdateUserData.Provider value={userData}>
          {needUpdate? <Update /> : online ? <Loding /> : <Login />}
        </UpdateUserData.Provider>
      </>
    );
}

export default main;