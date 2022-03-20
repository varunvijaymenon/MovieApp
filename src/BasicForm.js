import {useFormik} from 'formik'
import * as yup from 'yup'

const formValidationSchema = yup.object({
    email: yup.string()
        .email('Invalid email')
        .matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Pattern not matched')
        .required("Why not fill this email?"),
    password: yup.string().min(8,"need a longer password").max(12,"Password is too long").required("Why not fill this password?")
})

export function BasicForm() {
    
    const formik =  useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            console.log("onSubmit",values)
        },
    })

    return (
      <form onSubmit={formik.handleSubmit}>
        <input 
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='email' placeholder="email" />
        <br/>
        {formik.touched.email && formik.errors.email ? formik.errors.email : ""} 
        <br/>
        <input
            id='password'
            name='password'
            value={formik.values.password} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='password' placeholder="password" />
        <br/>
        {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        <br/>
        <button type='submit'>Submit</button>
      </form>
    )
  }
  
  //name - required
  //poster - min4, required
  //rating - 0 -10 required
  //summary- min 20characters required
  //trailer min 4, required