import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Signin() {

    const [error, setError] = useState(false);
    const router = useRouter();
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement)?.focus();
        }
    }, []);
    
    function singRequest(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        //console.log('singRequest');
        const f = async () => {
            e.preventDefault();
            //console.log('singRequest');
            const data = {
                userName: (document.getElementsByName("Email or UserName")[0] as HTMLInputElement).value,
                email: (document.getElementsByName("Email or UserName")[0] as HTMLInputElement).value,
                password: (document.getElementsByName("Password")[0] as HTMLInputElement).value
            };
            try {
                const response = await axios.post(process.env.NEST_API + '/signin', JSON.stringify(data) , {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    // body: JSON.stringify(data)
                });
                const responseData = response.data;
                if (responseData.login === undefined || responseData.login === false || responseData.login === null) {
                    setError(true);
                } else {
                    router.push('/');
                    e.currentTarget?.reset();
                    //console.log('Success:', e?.currentTarget);
                }
            } catch (error) {
                setError(true);
                // e.currentTarget.reset();
                // router.push('/login');
                //console.error('Error:', error);
            }
        }
        f();
    }


    return (
        <form className='input-container' onSubmit={singRequest}>
            <input ref={inputRef} name="Email or UserName" type="text" className={`input ${error ? 'InputError' : ""}`}  placeholder="Email or UserName"/>
            <input name="Password" type="password" autoComplete="none" className={`input ${error ? 'InputError' : ""}`}  placeholder="Password" />
            {error && <p className="ErrorMessage">Invalid userName or password</p>}
            <button type="submit" id="singbtn">Sign in</button>
        </form>
    )
}

//req.password