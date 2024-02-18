import { type } from "os"
import * as Yup from 'yup'



export const myForm =  {
        userName: '',
        Email: '',
        Password: '',
        "Confirm Password": ''
}

type h = {
    userName: string,
    Email: string,
    Password: string,
    "Confirm Password": string

}


export const validationSchema = Yup.object().shape({

    userName: Yup.string()
        .min(4, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required')
        .matches(/^[a-zA-Z0-9-_]+$/, 'No spaces or special characters allowed'),
    Email: Yup.string().email('Invalid email').required('Required'),
    Password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/[a-z]/, 'Needs a lowercase letter')
        .matches(/[A-Z]/, 'Needs a uppercase letter')
        .matches(/[0-9]/, 'Needs a number')
        .required('Required'),
    "Confirm Password": Yup.string()
        .oneOf([Yup.ref('Password')], 'Passwords must match')
        .required('Required')
});

