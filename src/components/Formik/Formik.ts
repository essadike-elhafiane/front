import { type } from "os"
import * as Yup from 'yup'



export const myForm =  {
        Username: '',
        Email: '',
        Password: '',
        "Confirm Password": ''
}


export const validationSchema = Yup.object().shape({

    Username: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    Email: Yup.string().email('Invalid email').required('Required'),
    Password: Yup.string()
        .min(6, 'Too Short!')
        .max(16, 'Too Long!')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one letter and one number')
        .required('Required'),
    "Confirm Password": Yup.string()
        .oneOf([Yup.ref('Password')], 'Passwords must match')
        .required('Required')
});

