import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { myForm, validationSchema } from "./Formik/Formik";

export default function Signup() {
    
    const arr: string[] = ["Username", "Email", "Password", "Confirm Password"];
    const formik = useFormik(
        {
            initialValues: myForm,
            validationSchema: validationSchema,
            onSubmit: (values) => {
                console.log('onSubmit :',values);
            }
        }
    );

    // const singupRequest =  (e: React.FormEvent<HTMLFormElement>)=>
    // {
    //     // console.log(inputs);
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     const payload = Object.fromEntries(formData);
    //     // console.log(payload);
        
    //     // const data =await axios.post('http://localhost:5000/signup', {
    //     //     username: inputs['Username']
    //     //     , email: inputs['Email']
    //     //     , password: inputs['Password']
    //     //     // firstName: inputs['Username']
    //     // }, {
    //     //    withCredentials: true
    //     // });
    //     // console.log(data);
    // }

    console.log(formik.errors);

    let input = arr.map((item: string) => {
        return (
            <div key={item}>
                <input 
                    value={formik.values[item as keyof typeof myForm] || ''}
                    onChange={formik.handleChange}
                    name={item} key={item} className={`input ${formik.errors[item as keyof typeof myForm] && formik.touched[item as keyof typeof myForm]  ? 'InputError' : ''}`}
                    placeholder={item}
                    type={item === "Password"  || item === "Confirm Password" ? 'password' : 'text'}
                    autoComplete={item === "Password"  || item === "Confirm Password" ? 'none' : 'yes'}
                    onBlur={formik.handleBlur}
                />
                {formik.errors[item as keyof typeof myForm] && formik.touched[item as keyof typeof myForm] ? <p className="ErrorMessage">{formik.errors[item as keyof typeof myForm]}</p> : ''}
            </div>
        )
    })

    return (
        <div className="input-container">
            <form onSubmit={formik.handleSubmit}>
                {input}
                <button id="singbtn" type="submit" className={``}
                >Sign up</button>
            </form>
        </div>
    )
}
