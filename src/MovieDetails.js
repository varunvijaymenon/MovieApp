import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {NotFoundPage} from './App';
import { useEffect, useState } from "react";
import {API} from './global'

export function MovieDetails() {
  const { id } = useParams();
  // const movie = movieList[id];
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(`${API}/movies/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setMovie(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if(!movie) return <NotFoundPage/>
  
  return (
    <div>
        <iframe 
        width="100%" 
        height="570" 
        src={movie.trailer} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
        <div className='movie-detail-container'>
        <div className='movie-specs'>
            <h2 className='movie-name'>{movie.name}</h2>
            <p className='movie-rating'>⭐️ {movie.rating}</p>
        </div>
        <p className='movie-summary'>{movie.summary}</p>

        <Button variant="contained" startIcon={<ArrowBackIosIcon/>} onClick={() => navigate(`/movies`)}>Back</Button>

        </div>
    </div>
  );
}
