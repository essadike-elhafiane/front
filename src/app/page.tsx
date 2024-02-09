"use client";

import { useEffect, useState } from 'react';
import '../style/landingPage.css';
import localfont from '@next/font/local'
import axios from 'axios';

const Itcfront = localfont(
  {
    // name: 'Itcfront',
    src: '/../../fronts/ITC-Franklin-Gothic-LT-Medium-Condensed.ttf',
    weight: '400',
  }
);


export default function landingPage()
{
    const [data, setData] = useState(null);

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get('http://localhost:3000/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
                );
                    setData(res.data);
                } catch (error) {
                    console.error('Error:', error);
                }
        }
        getdata();
        console.log('data:', data);
      },[]);
    
    return (
        <>
            <div>{data? data.userName : 'loding...'}</div>
            {/* <button onClick={getdata}>Get data</button> */}
            {/* <nav>
                <div className='logoContainer'>
                    <img src="/logo.png" alt="" className='logo'/>
                    <h1>PONG<span>MASTER</span></h1>
                </div>
                <div className='navLinks'>
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Contact</a>
                    <a href='http://localhost:3000/login'>Login</a>
                </div>
            </nav>
            <div className={`container ${Itcfront.className}`}>
                <div className='text'>
                    <h1>WELCOME TO PONG<span>MASTER</span></h1>
                    <p>Master the art of pong</p>
                {/* <h1>PONG<span>MASTER</span></h1>
                <p>Master the art of pong</p> */}
                {/* </div> */}
                {/*// <img src="/Player_One5.png" alt="" className='PongImg'/>8}}
            {/*</div> */}
        </>
        );
}