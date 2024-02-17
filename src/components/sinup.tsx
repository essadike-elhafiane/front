import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { myForm, validationSchema } from "./Formik/Formik";
import '@/style/styles.css';
export default function Signup() {
    
    // const arr: string[] = ["Username", "Email", "Password", "Confirm Password",];
    
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
    //     //     username: inputs.Username
    //     //     , email: inputs.Email
    //     //     , password: inputs['Password']
    //     //     // firstName: inputs['Username']
    //     // }, {
    //     //    withCredentials: true
    //     // });
    //     // console.log(data);
    // }

    console.log(formik.errors);

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
                <input value={formik.values.Username} onChange={formik.handleChange} name="Username" key="Username" className={`input ${formik.errors['Username'] && formik.touched['Username'] ? 'InputError' : ''}`} placeholder="Username" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
                {formik.errors.Username && formik.touched.Username ? <p className="ErrorMessage">{formik.errors.Username}</p> : ''}
                <input value={formik.values.Email} onChange={formik.handleChange} name="Email" key="Email" className={`input ${formik.errors.Email && formik.touched.Email ? 'InputError' : ''}`} placeholder="Email" type="text" autoComplete="yes" onBlur={formik.handleBlur}/>
                {formik.errors.Email && formik.touched.Email ? <p className="ErrorMessage">{formik.errors.Email}</p> : ''}
                <input value={formik.values.Password} onChange={formik.handleChange} name="Password" key="Password" className={`input ${formik.errors.Password && formik.touched.Password ? 'InputError' : ''}`} placeholder="Password" type="password" autoComplete="none" onBlur={formik.handleBlur}/>
                {formik.errors.Password && formik.touched.Password ? <p className="ErrorMessage">{formik.errors.Password}</p> : ''}
                <input value={formik.values["Confirm Password"]} onChange={formik.handleChange} name="Confirm Password" key="Confirm Password" className={`input ${formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? 'InputError' : ''}`} placeholder="Confirm Password" type="password" autoComplete="none" onBlur={formik.handleBlur}/>
                {formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? <p className="ErrorMessage">{formik.errors["Confirm Password"]}</p> : ''}
                <button id="singbtn" type="submit" className={``}
                >Sign up</button>
            </form>
    )
}
