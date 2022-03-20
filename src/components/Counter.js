import React from 'react';
import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useEffect } from 'react';


export default function Counter() {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    useEffect(()=>{console.log("like is updated", like)},[like,dislike])
  return (
    <div className="counter-container">
      
       <IconButton aria-label="like movie" onClick={()=> setLike(like + 1)} className="btn-sz-lg" color="primary">
       <Badge badgeContent={like} color="primary">
       👍
       </Badge>
      </IconButton>
      
      <IconButton aria-label="dislike movie" onClick={()=> setDislike(dislike + 1)} className="btn-sz-lg" color="error">
      <Badge badgeContent={dislike} color="error">
       👎
       </Badge>
      </IconButton>
    </div>
  )
}
