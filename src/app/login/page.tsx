"use client";
import '../../style/styles.css'
import Image from 'next/image';
// import '../../style/styles copy.css';
import Signup from '@/components/sinup'
import React, { useEffect, useState } from 'react';
import Signin from '@/components/singin';
import BackGround from '@/components/bg';

async function authIntra()
{
    window.location.href = 'http://localhost:3000/api/auth/intra';
}

function authGoogle()
{
    window.location.href = 'http://localhost:3000/api/auth/google';
}

function main()
{
    const [insignin, setsign] = useState(true);
   
    return (

        <>
        <BackGround/>
        <div className='main'>
          <div className='container' >
              <div className='row'>
          <h1 className='h1logo'>PO<span>ng</span>Master</h1>
                  
                
                <div id='loginBtn'>
                    <a href='#' className={`${insignin ? 'inactive_sing' : 'active_sing' }`} onClick={()=>{
                      setsign(false)
                    }}>Sign up</a>

                    <a href='#' className={`${insignin ? 'active_sing' : 'inactive_sing'}`} onClick={()=>{
                      setsign(true);
                    }}>Login</a>

                    {insignin? <Signin/> : <Signup/>}
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
        </div>
        </>
    );
}

export default main;