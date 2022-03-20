import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API } from '../global';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  Name: yup
      .string("Enter Movie Name")
      .required("Movie name is required"),

  Poster: yup
      .string("Please Add Poster Link")
      .min(4,'Poster Link must be atleast 4 characters')
      .required('Poster is required'),
  
  Rating: yup
      // .string("Please Enter a Rating")
      // .matches(/^(?<![\d\.-])\d(\.\d)?(?!(\.\d)|\d)|(?<![\d\.-])10(?!(\.\d)|\d])$/,"Should be between 0-10")
      // .required('Rating is required'),
      .number()
      .min(4, 'Need a higher rating')
      .max(10, 'Too much rating')
      .required('Rating is required'),
  
  Summary: yup
      .string("Enter a Summary")
      .min(20,'Summary must be atleast 20 characters')
      .required('Summary is required'),
    
  Trailer: yup
      .string("Please input the link to the trailer")
      .min(4,'Trailer link must be atleast 4 characters')
      .required('Trailer is required'),
})

export default function EditMovie() {
 
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const movieDetails = () =>{
      fetch(`${API}/movies/${id}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setMovie(data)
        console.log(data)
      })
    }

    useEffect(() => {
      movieDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
  

  return (
    movie ? <EditMovieForm movie={movie} id={id} /> : <h1>Loading..</h1>
  )
}

function EditMovieForm ({movie, id}) {

  const formik = useFormik({
    initialValues: {
      Name: movie.name,
      Poster: movie.poster,
      Rating: movie.rating,
      Summary: movie.summary,
      Trailer: movie.trailer,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      // setMovieList(movieList.map(item => (item.id === movie.id ? {name, poster,rating,summary,trailer}: item)))
      const newMovieINFO = {
        name:    values.Name,
        poster:  values.Poster,
        rating:  values.Rating,
        summary: values.Summary,
        trailer: values.Trailer
      }

      fetch(`${API}/movies/${id}`, {method: "PUT", body: JSON.stringify(newMovieINFO), headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(() => navigate('/movies'))

    }
  });

  const navigate = useNavigate();

  return (

    <div className="edit-movie-form">
      <form onSubmit={formik.handleSubmit}>
    
            <TextField id="Name"    
                       name="Name"
                       label="Name"
                       variant="standard" 
                       value={formik.values.Name}
                       error={formik.touched.Name && Boolean(formik.errors.Name)}
                       helperText={formik.touched.Name && formik.errors.Name}     
                       onChange={formik.handleChange}
                       />
            <TextField id="Poster"  
                       name="Poster"  
                       label="Poster"  
                       variant="standard" 
                       value={formik.values.Poster}
                       error={formik.touched.Poster && Boolean(formik.errors.Poster)}
                       helperText={formik.touched.Poster && formik.errors.Poster}    
                       onChange={formik.handleChange}
                       />
            <TextField id="Rating"  
                       name="Rating"  
                       label="Rating"  
                       variant="standard" 
                       value={formik.values.Rating}
                       error={formik.touched.Rating && Boolean(formik.errors.Rating)}
                       helperText={formik.touched.Rating && formik.errors.Rating}   
                       onChange={formik.handleChange}
                       />
            <TextField id="Summary" 
                       name="Summary" 
                       label="Summary" 
                       variant="standard" 
                       value={formik.values.Summary}
                       error={formik.touched.Summary && Boolean(formik.errors.Summary)}
                       helperText={formik.touched.Summary && formik.errors.Summary} 
                       onChange={formik.handleChange}
                       />
            <TextField id="Trailer" 
                       name="Trailer" 
                       label="Trailer" 
                       variant="standard" 
                       value={formik.values.Trailer}
                       error={formik.touched.Trailer && Boolean(formik.errors.Trailer)}
                       helperText={formik.touched.Trailer && formik.errors.Trailer} 
                       onChange={formik.handleChange}/>

            <Button type="submit" variant="contained" onClick={() => {
              console.log("button clicked")
            }}
            color="success"
            >Save</Button>
            </form>

        </div>
  )
}