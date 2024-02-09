import axios from 'axios';
import { useRouter } from 'next/router';
export default async function authIntra()
{

    window.location.href = 'http://localhost:3000/api/auth/intra';
    // console.log('authIntra');
    // const data = await axios('http://localhost:3000/api/auth/intra',{
    //     headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     withCredentials: true,
    //   });
    // console.log(data);
}