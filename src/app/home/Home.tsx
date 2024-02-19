import UserDataContext, { UserData } from "@/components/context";
import {useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";




export default function Home() {
    const data: UserData | null = useContext(UserDataContext);
    const router = useRouter();

    function Logout()
    {
        fetch(process.env.NEST_API + '/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            router.push('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    return <>
        <div>
            <h1>Home</h1>
            <div>
                <h1>{data?.userName}</h1>
                <h1>{data?.email}</h1>
                <h1>{data?.online.toString()}</h1>
                <Image
                    src={data?.image?.toString() ?? './defaultImg.svg'}
                    alt="profile"
                    priority={true}
                    width={100}
                    height={100}
                    style={{
                        maxWidth: "100%",
                        height: "auto"
                    }} />
            </div>
            <button onClick={() => {Logout()}}>Logout</button>
        </div>
    </>;
}
