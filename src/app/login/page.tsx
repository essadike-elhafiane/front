"use client";
import '../../style/styles.css'
import Signup from '../../components/sinup'
import React, { useState } from 'react';
import Signin from '../../components/singin';
import { Lalezar } from '@next/font/google'
import authIntra from '../../auth/auth';

const lalezar = Lalezar(
  {
    subsets: [],
    weight: ['400'],
  }
);
// import Head from 'next/head';
// import { useClient } from 'blitz';
function main()
{
    // const client = useClient();
    // if (!client) {
      //   return null; // Return null or a fallback UI when rendering on the server
      // }
    const [insignin, setsign] = useState(true);
    
    return (
        
        <div className={'container' + ' ' + `${lalezar.className}`} >
            <div className='row'>
            <h1 className='h1logo'></h1>
                
                {/* <img src='/Ping_Master.png' id='logo'></img>  */}
              <div id='loginBtn'>
                  <a href='#' className={`${insignin ? 'inactive_sing' : 'active_sing' }`} onClick={()=>{
                    setsign(false)
                  }}>Sign up</a>

                  <a href='#' className={`${insignin ? 'active_sing' : 'inactive_sing'}`} onClick={()=>{
                    setsign(true);
                  }}>Login</a>

                  {insignin? <Signin /> : <Signup/>}
              </div>
            </div>
            <div className='row1'>
                <div id='div-row1'>
                    <div  className='btnAuth' onClick={()=> {authIntra()}}>
                      <img src="/intra.png" alt="" />
                      <span>Intra</span>
                    </div>
                    <div  className='btnAuth'>
                      <img src='/googlelogo.png' alt="" />
                      <span>Google</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default main;