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


    return (
        <form className='input-container'>
            <input name="Email or Username" type="text" className={`input ${error ? 'InputError' : ""}`}  placeholder="Email or Username"/>
            <input name="Password" type="password" autoComplete="none" className={`input ${error ? 'InputError' : ""}`}  placeholder="Password" />
            <button id="singbtn" onClick={singRequest}>Sign in</button>
            {error && <p className="ErrorMessage">Invalid username or password</p>}
        </form>
    )
}

//req.password