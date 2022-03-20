import React from 'react';
import {useState} from 'react';

export default function AddColor() {
    const [color, setColor] = useState("orange");
    const styles = {
        fontSize: "24px",
        backgroundColor: color,
    };
    const [colorList, setColorList] = useState(['orange', 'crimson', 'red']);
  return (
    <div>
        <div className="add-color">
        <input onChange={(event) => setColor(event.target.value)} style={styles} placeholder="Pick a color" />
        <button className='btn-bg' onClick={() => setColorList([...colorList, color])} >Add color</button>
        </div>
        {colorList.map((clr) => <ColorBox color={clr}></ColorBox>)}
        <ColorBox></ColorBox>

    </div>
  )
}

function ColorBox({color}){

    const styles ={
        backgroundColor: color,
        height: "35px",
        width: "300px",
        marginTop: "10px"
    }
    return (
        <div style={styles}></div>
    )
}