import { useState } from "react";
import { Lalezar } from '@next/font/google'

const lalezar = Lalezar(
  {
    subsets: [],
    weight: ['400'],
  }
);

interface ErrorInput {
    [key: string]: boolean;
}

interface Inputs{
    [key: string]: string;
}


export default function Signup() {
    
    const arr: string[] = ["Username", "Email", "Password", "Confirm Password"];
    
    
    const [inputs, setInput] = useState<Inputs>({'Username':'', 'Email':'', 'Password':'', 'Confirm Password':''});
    const [ErrorInput, setErrorInput] = useState<ErrorInput>({ 'Username': false, 'Email': false, 'Password': false, 'Confirm Password': false });
    
    function checkInput(inputs: Inputs)
    {
        
            const hasUppercase = /[A-Z]/.test(inputs['Password']);
            const isLengthValid = inputs['Password'].length > 10;
            const hasNumber = /\d/.test(inputs['Password']);
            const hasLowercase = /[a-z]/.test(inputs['Password']);

            if (!hasLowercase || !hasNumber || !hasUppercase || !isLengthValid)
            {
                setErrorInput({ ...ErrorInput, ['Password']: true });
                return ;
            }
            setErrorInput({ ...ErrorInput, ['Password']: false });
            if (inputs['Confirm Password'] !== inputs['Password']) {
                setErrorInput({ ...ErrorInput, ['Confirm Password']: true });
                return ;
            }
            else
                setErrorInput({ ...ErrorInput, ['Confirm Password']: false });
    }

    let input = arr.map((item: string) => {
        return <input key={item} className={`input ${ErrorInput[item] ? "InputError" : ""} ${lalezar.className}`}
            type="text" placeholder={item}
            onChange={(e) => {
                setInput({ ...inputs, [item]: e.target.value });
            }} />
    })

    return (
        <div className="input-container">
            {input}
            <button id="singbtn" className={`${lalezar.className}`}
                onClick={() => checkInput(inputs)}
            >Sign up</button>
        </div>
    )
}