import { Movie } from "./Movie";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import {API} from "./global.js"
import { useNavigate } from "react-router-dom";



export function MovieList() {

  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  const getMovies = () => {
    fetch(`${API}/movies`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => setMovieList(data))}

  useEffect(() => getMovies(),[]);


  return (
    <div className="movie-list">
      {movieList.map((mv, index) => <Movie key={index} movie={mv} id={mv.id} 
      deleteButton ={<IconButton onClick={()=>{ fetch(`${API}/movies/${mv.id}`, {method: "DELETE"}).then(() => getMovies())}}> 
      <DeleteIcon style={{color:'red'}}/></IconButton>}
      editButton ={<IconButton onClick={() => {
        navigate(`/movies/edit/${mv.id}`)
        }} color='secondary'> 
      <EditIcon /></IconButton>}
      
      ></Movie>)}
    </div>
  );
}


// movieList.filter(movie=>(movie.id!== index))