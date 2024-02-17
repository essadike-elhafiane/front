import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {

    const [error, setError] = useState(false);
    const router = useRouter();

    
    function singRequest(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
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
            e.currentTarget.reset();
            console.log('Success:', e.currentTarget);
        })
        .catch((error) => {
            e.currentTarget.reset();
            // router.push('/login');
            // console.error('Error:', error);
        });
    }


    return (
        <form className='input-container' onSubmit={singRequest}>
            <input name="Email or Username" type="text" className={`input ${error ? 'InputError' : ""}`}  placeholder="Email or Username"/>
            <input name="Password" type="password" autoComplete="none" className={`input ${error ? 'InputError' : ""}`}  placeholder="Password" />
            {error && <p className="ErrorMessage">Invalid username or password</p>}
            <button type="submit" id="singbtn">Sign in</button>
        </form>
    )
}

//req.password