import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { myForm, validationSchema } from "./Formik/Formik";
import '@/styles/login/styles.css';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Signup() {
    const router = useRouter();
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement)?.focus();
        }
    }, []);
    // const arr: string[] = ["userName", "Email", "Password", "Confirm Password",];
    const signupRequest = async (values: typeof myForm) => {
        try {
            const response = await axios.post(process.env.NEST_API + '/signup', {
                userName: values.userName,
                email: values.Email,
                password: `${values.Password}`
            }, {
                withCredentials: true
            });
            //console.log(response.data);
            router.push('/');
        } catch (error: any) {
            //console.error(error?.response?.data?.target);
            switch (error?.response?.data?.target) {
                case "userName":
                    formik.setErrors({ userName: 'userName is already used' });
                    break;
                case "email":
                    formik.setErrors({ Email: 'Email is already used' });
                    break;
                // default:
                //     alert("Something went wrong");
                //     break;
            }
        }
    }
    
    const formik = useFormik(
        {
            initialValues: myForm,
            validationSchema: validationSchema,
            onSubmit: signupRequest,
        }
    );

    // const singupRequest =  (e: React.FormEvent<HTMLFormElement>)=>
    // {
    //     // //console.log(inputs);
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     const payload = Object.fromEntries(formData);
    //     // //console.log(payload);
        
    //     // const data =await axios.post('http://localhost:5000/signup', {
    //     //     userName: inputs.userName
    //     //     , email: inputs.Email
    //     //     , password: inputs['Password']
    //     //     // firstName: inputs['userName']
    //     // }, {
    //     //    withCredentials: true
    //     // });
    //     // //console.log(data);
    // }

    // //console.log(formik.errors);

    // let input = arr.map((item: string) => {
    //     return (
    //         <div key={item}>
    //             <input 
    //                 value={formik.values[item as keyof typeof myForm] || ''}
    //                 onChange={formik.handleChange}
    //                 name={item} key={item} className={`input ${formik.errors[item as keyof typeof myForm] && formik.touched[item as keyof typeof myForm]  ? 'InputError' : ''}`}
    //                 placeholder={item}
    //                 type={item === "Password"  || item === "Confirm Password" ? 'password' : 'text'}
    //                 autoComplete={item === "Password"  || item === "Confirm Password" ? 'none' : 'yes'}
    //                 onBlur={formik.handleBlur}/>
    //             {formik.errors[item as keyof typeof myForm] && formik.touched[item as keyof typeof myForm] ? <p className="ErrorMessage">{formik.errors[item as keyof typeof myForm]}</p> : ''}
    //         </div>
    //     )
    // })

    return (
            <form onSubmit={formik.handleSubmit} className="input-container">
                <input ref={inputRef} value={formik.values.userName} onChange={formik.handleChange} name="userName" key="userName" className={`input ${formik.errors['userName'] && formik.touched['userName'] ? 'InputError' : ''}`} placeholder="UserName" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
                {formik.errors.userName && formik.touched.userName ? <p className="ErrorMessage">{formik.errors.userName}</p> : ''}
                <input value={formik.values.Email} onChange={formik.handleChange} name="Email" key="Email" className={`input ${formik.errors.Email && formik.touched.Email ? 'InputError' : ''}`} placeholder="Email" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
                {formik.errors.Email && formik.touched.Email ? <p className="ErrorMessage">{formik.errors.Email}</p> : ''}
                <input value={formik.values.Password} onChange={formik.handleChange} name="Password" key="Password" className={`input ${formik.errors.Password && formik.touched.Password ? 'InputError' : ''}`} placeholder="Password" type="password" autoComplete="none" onBlur={formik.handleBlur}/>
                {formik.errors.Password && formik.touched.Password ? <p className="ErrorMessage">{formik.errors.Password}</p> : ''}
                <input value={formik.values["Confirm Password"]} onChange={formik.handleChange} name="Confirm Password" key="Confirm Password" className={`input ${formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? 'InputError' : ''}`} placeholder="Confirm Password" type="password" autoComplete="none" onBlur={formik.handleBlur}/>
                {formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? <p className="ErrorMessage">{formik.errors["Confirm Password"]}</p> : ''}
                
                
                <button id="singbtn" type="submit">Sign up</button>
                
            </form>
    )
}
