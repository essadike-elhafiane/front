import { type } from "os"
import * as Yup from 'yup'



export const myForm =  {
        Username: '',
        Email: '',
        Password: '',
        "Confirm Password": ''
}

type h = {
    Username: string,
    Email: string,
    Password: string,
    "Confirm Password": string

}


export const validationSchema = Yup.object().shape({

    Username: Yup.string()
        .min(4, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required')
        .matches(/^[a-zA-Z0-9-_]+$/, 'No spaces or special characters allowed'),
    Email: Yup.string().email('Invalid email').required('Required'),
    Password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Password must contain at least one upercase and one lowercase and number')
        .required('Required'),
    "Confirm Password": Yup.string()
        .oneOf([Yup.ref('Password')], 'Passwords must match')
        .required('Required')
});

