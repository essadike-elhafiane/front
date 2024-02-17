import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {

    const [error, setError] = useState(false);
    const router = useRouter();

    
    function singRequest()
    {

        console.log('singRequest');
        const data = {
            userName: (document.getElementsByName("Email or Username")[0] as HTMLInputElement).value,
            email: (document.getElementsByName("Email or Username")[0] as HTMLInputElement).value,
            password: (document.getElementsByName("Password")[0] as HTMLInputElement).value
        }
        fetch('http://localhost:3000/singin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.login === undefined) {
                return setError(true);
            }
            router.push('/');
        })
        .catch((error) => {
            // router.push('/login');
            console.error('Error:', error);
        });
    }

    const arr = ["Email or Username", "Password"];

    const input = arr.map((item) => {
        return (
            <input name={item} key={item} type={item === "Password" ? 'password' : 'text'} className={`input ${error ? 'InputError' : ""}`} autoComplete="none" placeholder={item} />
        )
    })

    return (
            <div className='input-container'>
                <form autoComplete="none">
                {input}
                <button id="singbtn" onClick={singRequest}>Sign in</button>
                {error && <p>Invalid username or password</p>}
                </form>
            </div>
    )
}

//req.password