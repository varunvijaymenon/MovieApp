import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useNavigate} from "react-router-dom";
import {API} from '../global'
import './AddMovieStyle.css'

const validationSchema = yup.object({
  Name: yup
      .string()
      .required("Movie name is required"),

  Poster: yup
      .string()
      .min(4,'Poster Link must be atleast 4 characters')
      .required('Poster is required'),
  
  Rating: yup
      // .string()
      // .matches(/^(?<![\d\.-])\d(\.\d)?(?!(\.\d)|\d)|(?<![\d\.-])10(?!(\.\d)|\d])$/,"Should be between 0-10")
      // .required('Rating is required'),
      .number()
      .min(4, 'Need a higher rating')
      .max(10, 'Too much rating')
      .required('Rating is required'),
  
  Summary: yup
      .string()
      .min(20,'Summary must be atleast 20 characters')
      .required('Summary is required'),
    
  Trailer: yup
      .string()
      .min(4,'Trailer link must be atleast 4 characters')
      .required('Trailer is required'),
})

export function AddMovie() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: '',
      Poster: '',
      Rating: '',
      Summary: '',
      Trailer: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      
      const newMovie = {
        name: values.Name,
        poster: values.Poster,
        rating: values.Rating,
        summary: values.Summary,
        trailer: values.Trailer,
      };
      console.log(newMovie);

      fetch(`${API}/movies`, {method: "POST", body: JSON.stringify(newMovie), headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(() => navigate('/movies'))
      // setMovieList([...movieList, {name,poster,rating,summary,trailer}])
    }
  });

  return (
  <div className="add-movie-form">
    <form onSubmit={formik.handleSubmit}>

        <TextField 
          id="Name" 
          name="Name" 
          label="Name"
          value={formik.values.Name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Name && Boolean(formik.errors.Name)}
          helperText={formik.touched.Name && formik.errors.Name} 
          variant="standard"
          // onChange={(event) => setName(event.target.value)} 
        />
        <TextField
          id="Poster"
          name="Poster" 
          label="Poster"
          value={formik.values.Poster}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Poster && Boolean(formik.errors.Poster)}
          helperText={formik.touched.Poster && formik.errors.Poster}
          variant="standard"
          // onChange={(event) => setPoster(event.target.value)} 
        />
        <TextField 
          id="Rating"
          name="Rating"
          label="Rating" 
          value={formik.values.Rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Rating && Boolean(formik.errors.Rating)}
          helperText={formik.touched.Rating && formik.errors.Rating}
          variant="standard"
        />
        <TextField 
          id="Summary"
          name="Summary"
          label="Summary"
          value={formik.values.Summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Summary && Boolean(formik.errors.Summary)}
          helperText={formik.touched.Summary && formik.errors.Summary}
          variant="standard"
        // onChange={(event) => setSummary(event.target.value)} 
        />
        <TextField 
          id="Trailer"
          name="Trailer"
          label="Trailer"
          value={formik.values.Trailer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Trailer && Boolean(formik.errors.Trailer)}
          helperText={formik.touched.Trailer && formik.errors.Trailer}
          variant="standard"
        // onChange={(event) => setTrailer(event.target.value)} 
        />

        <Button type="submit" variant="contained" onClick={() => {

            console.log('button clicked');
            
        }}>Add movie</Button>
        </form>
  </div>
  )
}
