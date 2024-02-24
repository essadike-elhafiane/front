
import { useEffect, useState } from 'react';
import '../styles/login/landingPage.css';
import axios from 'axios';
import UserDataContext, { UserData } from '@/components/context';
import Home from './home/Home';
import { Loding } from './home/Loding';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';

export default function landingPage() {
    const [data, setData] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getdata = async () => {
            try {
                const ApiUrl = process.env.NEST_API;
                const cookies = cookie.parse(document.cookie);
                console.log(cookies.jwt);

                const res = await axios.get(ApiUrl + '/status', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.jwt}`,
                    },
                    withCredentials: true,
                });

                if (res.data === undefined || res.data === false || res.data === null) {
                    router.push('/login');
                } else {
                    setData(res.data);
                }
            } catch (error) {
                router.push('/login');
            }
        };

        getdata();
    }, []);

    return (
        <>
            <UserDataContext.Provider value={data}>
                {data ? <Home /> : <Loding />}
            </UserDataContext.Provider>
        </>
    );
}
