import axios from "axios";
import {useFormik } from "formik";
import { SignupForm, signupValidationSchema } from "./Formik/Formik";
import '@/styles/login/styles.css';
import { useRouter } from "next/navigation";


export default function Signup() {
    const router = useRouter();

    const signupRequest = async (values: typeof SignupForm) => {
        // console.log('valus',values);
        try {
            const response = await axios.post(process.env.NEST_API + '/signup', {
                firstName: values.FirstName,
                email: values.Email,
                lastName: values.LastName,
                // password: `${values.Password}`
            }, {
                withCredentials: true
            });
            console.log(response.data);
            if (response.status === 201)
            router.push('/');
        } catch (error: any) {
            //console.error(error?.response?.data?.target);
                console.log(error);
                // case "userName":
                //     formik.setErrors({ userName: 'userName is already used' });
                //     break;
             
                formik.setErrors({ Email: 'Email is already used or invalide' });
                
                // default:
                //     alert("Something went wrong");
                //     break;
            
        }
    }
    
    const formik = useFormik(
        {
            initialValues: SignupForm,
            validationSchema: signupValidationSchema,
            onSubmit: signupRequest
        }
    );

    return (
        <form onSubmit={formik.handleSubmit} className="input-container">
            <input value={formik.values.FirstName}  onChange={formik.handleChange} name="FirstName" key="FirstName" className={`input ${formik.errors.FirstName && formik.touched.FirstName ? 'InputError' : ''}`} placeholder="First name" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
            {formik.errors.FirstName && formik.touched.FirstName ? <p className="ErrorMessage">{formik.errors.FirstName}</p> : ''}
            <input onChange={formik.handleChange} value={formik.values.LastName} name="LastName" key="LastName" className={`input ${formik.errors.LastName && formik.touched.LastName ? 'InputError' : ''}`} placeholder="Last name" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
            {formik.errors.LastName && formik.touched.LastName ? <p className="ErrorMessage">{formik.errors.LastName}</p> : ''}
            <input  value={formik.values.Email} onChange={formik.handleChange} name="Email" key="Email" className={`input ${formik.errors.Email && formik.touched.Email ? 'InputError' : ''}`} placeholder="Email" type="email" autoComplete="yes" onBlur={formik.handleBlur}/>
            {formik.errors.Email && formik.touched.Email ? <p className="ErrorMessage">{formik.errors.Email}</p> : ''}
            <button id="singbtn" type="submit">Sign up</button>
        </form>
    )
}