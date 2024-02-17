"use client";
import '../../style/styles.css'
import Image from 'next/image';
import Signup from '@/components/sinup'
import React, { useEffect, useState } from 'react';
import Signin from '@/components/singin';
import BackGround from '@/components/bg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loding } from '../home/Loding';

async function authIntra()
{
    window.location.href = process.env.NEST_API + '/api/auth/intra';
}

function authGoogle()
{
    window.location.href = process.env.NEST_API + '/api/auth/google';
}


function main()
{
  
  const router = useRouter(); 
  const [insignin, setsign] = useState(true);
  const [online, setonline] = useState(true);
    
    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl: string | undefined =  process.env.NEST_API;
                console.log('ApiUrl:', ApiUrl , process.env);
                const res = await axios.get(ApiUrl + '/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
                );
                if(res.data)
                {
                  if (typeof window !== 'undefined') {
                    router.push('/');
                  }
                }
            } catch (error) {
                setonline(false);
                console.log('Error:', error);
            } 
        }
        getdata();
    },[online]);

    return (

        <>

        { online? <Loding/> : <div className='main'>
          <div className='container' >
              <div className='row'>
                  <div className="logo">
                    <Image src='/Vector.svg' alt="logo" width={50} height={50}/>
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
                      <div  className='btnAuth' onClick={authIntra}>
                        <Image src="./intra.png" alt="" width={'100'} height={'100'}/>
                        <span>Intra</span>
                      </div>
                      <div  className='btnAuth' onClick={authGoogle}>
                        <Image src='./googlelogo.png' alt="" width={'100'} height={'100'}/>
                        <span>Google</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>}
        </>
    );
}

export default main;