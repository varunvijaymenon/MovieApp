import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {

    const navigate = useNavigate();
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/movies")}>Home</Button>
            <Button color="inherit">Movies</Button>
            <Button color="inherit">Color Game</Button>
            <Button color="inherit">Add Movie</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );


    
  }