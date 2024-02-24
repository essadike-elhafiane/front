"use client";
"use strict";
import '../../styles/login/styles.css'
import Image from "next/image";
import Signup from '@/components/signup'
import React, { useEffect, useState } from 'react';
import Signin from '@/components/signin';
// import BackGround from '@/components/bg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loding } from '../home/Loding';

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
  const [insignin, setsign] = useState(true);
  const [online, setonline] = useState(true);
  const [updated, setUpated] = useState(false);

    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl: string | undefined =  process.env.NEST_API;
                //console.log('ApiUrl:', ApiUrl , process.env);
                const jwt = sessionStorage.getItem('jwt');
                const res = await axios.get(ApiUrl + '/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwt,
                    },
                    withCredentials: true,
                }
                );
                if(res.data)
                {
                  if (typeof window !== 'undefined') {
                    if(res.data.updated)
                      router.push('/');
                    else
                      setUpated(false);
                  }
                }
            } catch (error) {
                setonline(false);
                //console.log('Error:', error);
            } 
        }
        getdata();
    },[]);

    return <>
     { online? <Loding/> : <div className='main'>
      <div className='container' >
          <div className='row'>
              <div className="logo">
                <Image
                    src='./Vector.svg'
                    alt="logo"
                    width={50}
                    height={50}
                    style={{
                        maxWidth: "100%",
                    }} />
                <h1>P<span>O</span>NGy</h1>
              </div>
              <div id='loginBtn'>
                  <a href='#' className={`${insignin ? 'inactive_sing' : 'active_sing' }`} onClick={()=>{
                    setsign(false)
                  }}>Sign up</a>

                  <a href='#' className={`${insignin ? 'active_sing' : 'inactive_sing'}`} onClick={()=>{
                    setsign(true);
                  }}>Login</a>
                  <div>
                    {insignin ? <Signin/> : <Signup/>}
                  </div>
              </div>
            </div>
          <div className='row1'>
              <div id='div-row1'>
                  <div  className='btnAuth' onClick={()=>{
                    router.push(process.env.NEST_API + '/api/auth/intra');
                  }}>
                    <Image
                        src="./IntraLogo.svg"
                        alt=""
                        width={'100'}
                        height={'100'}
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                    <span>Intra</span>
                  </div>
                  <div  className='btnAuth' onClick={authGoogle}>
                    <Image
                        src='./GoogleLogo.svg'
                        alt=""
                        width={'100'}
                        height={'100'}
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                    <span>Google</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
    }
    </>;
}

export default main;