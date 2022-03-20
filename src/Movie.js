import Counter from "./components/Counter";
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export function Movie({ movie, id, deleteButton, editButton }) {

  const styles = {
    color: movie.rating > 8 ? "green" : "red",
  };

  const [show, setShow] = useState(true);

  const paraStyles = {
    display: show ? 'block' : 'none'
  };

  const navigate = useNavigate();


  return (
     <Card className='movie-container'>
      <img src={movie.poster} alt={movie.name} className='movie-poster' />
      <CardContent>
      <div className='movie-specs'>
        <h2 className='movie-name'>{movie.name}
          <IconButton aria-label='Toggle description' onClick={() => setShow(!show)}>
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton aria-label='About Movie' onClick={() => navigate(`/movies/${id}`)} color='primary'>
            <InfoIcon />
          </IconButton>
        </h2>
        <p style={styles} className='movie-rating'>
          ⭐️ {movie.rating}
        </p>
      </div>
      <p style={paraStyles} className='movie-summary'>{movie.summary}</p>
      </CardContent>
      <CardActions>
      <Counter />
      {deleteButton}
      {editButton}
      </CardActions>

      </Card>
  );

}





