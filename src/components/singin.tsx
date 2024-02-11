// import { Lalezar } from '@next/font/google'

// const lalezar = Lalezar(
//   {
//     subsets: [],
//     weight: ['400'],
//   }
// );


export default function Signin() {

    const arr = ["Email or Username", "Password"];
    const input = arr.map((item) => {
             return <input name={item} key={item} type={item === "Password"? 'Password' : 'text'} className={`input `} placeholder={item} />
    })

    return (
        <div className='input-container'>
            {input}
            <button id="singbtn" className={``}>Sign in</button>
        </div>
    )
}