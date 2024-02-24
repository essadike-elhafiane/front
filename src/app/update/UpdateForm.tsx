import { updateForm, updateValidationSchema } from "@/components/Formik/Formik";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

const UpdateForm = () => {

    const router = useRouter();
    const sendUpdateRequest = async (values: typeof updateForm) => {
        try {
            const response = await axios.post(process.env.NEST_API + '/update', {
                userName: values.userName,
                password: values.Password,
            }, {
                withCredentials: true
            });
            console.log(response.data);
            if (response.status === 201)
                router.push('/');
        } catch (error: any) {
            formik.setErrors({ userName: 'userName is already used' });
        }
    }

    const formik = useFormik({
        initialValues: updateForm,
        validationSchema: updateValidationSchema,
        onSubmit: sendUpdateRequest,
    });

    return (
        <form onSubmit={formik.handleSubmit} className="input-container">
            <input value={formik.values.userName}
             onChange={formik.handleChange} name="userName" key="userName"
            className={`input ${formik.errors['userName'] && formik.touched['userName'] ? 'InputError' : ''}`}
            placeholder="UserName" type="text" autoComplete="yes" onBlur={formik.handleBlur}
            />
            {formik.errors.userName && formik.touched.userName ? <p className="ErrorMessage">{formik.errors.userName}</p> : ''}
            <input value={formik.values.Password} 
                onChange={formik.handleChange} name="Password" key="Password" 
                className={`input ${formik.errors.Password && formik.touched.Password ? 'InputError' : ''}`} 
                placeholder="Password" type="password" autoComplete="none" onBlur={formik.handleBlur}
            />
            {formik.errors.Password && formik.touched.Password ? <p className="ErrorMessage">{formik.errors.Password}</p> : ''}    
            <input 
                value={formik.values["Confirm Password"]} 
                onChange={formik.handleChange} name="Confirm Password" key="Confirm Password"
                className={`input ${formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? 'InputError' : ''}`}
                placeholder="Confirm Password" type="password" 
                autoComplete="none" onBlur={formik.handleBlur}
             /> 
            {formik.errors["Confirm Password"] && formik.touched["Confirm Password"] ? <p className="ErrorMessage">{formik.errors["Confirm Password"]}</p> : ''}
            <button id="singbtn" type="submit">Update</button>
        </form>
    );
}

export default UpdateForm;