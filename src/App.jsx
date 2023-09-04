import { useState } from 'react';
import './App.css';
//import json from '../ferris_sweep.layout.json';
import { displayKey } from './utils.js';
import  KeyCap from './KeyCap';
import KeyCapFlat from './KeyCapFlat';

function App() {

  
  const [selectedKeyCap, setSelectedKeyCap] = useState('Flat');
  const [fileChosen, setFileChosen] = useState(false);
  const [json, setJson] = useState();

  function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setJson(JSON.parse(e.target.result));
      setFileChosen(true);
    };
    reader.readAsText(file);
  }

  const Cols = (cols) => {
    return cols.map(c => {
      return (
        <div className="column">
          { selectedKeyCap === '3D' && <KeyCap keymap={displayKey(c)} tooltip={c} /> }
          { selectedKeyCap === 'Flat' && <KeyCapFlat keymap={displayKey(c)} tooltip={c} /> }
        </div>
      )
    })
  }

  const Rows = (rows) => {
    return rows.map(r => {
      return (
        <div className="row" >
          {Cols(r)}
        </div>
      )
    })
  }

  const LeftSplit = (props) => {
    return (
      <div style={{width: "50%", paddingTop: '20px'}}>
        {Rows(props.rows)}
      </div>
    )
  }

  const RightSplit = (props) => {
    return (
      <div style={{width: "50%"}}>
        {Rows(props.rows)}
      </div>
    )
  }

  const Layer = (props) => {
    const layer = props.layer;

    const leftrows = [
      [layer[0],layer[1],layer[2], layer[3],layer[4]],
      [layer[5],layer[6],layer[7], layer[8],layer[9]],
      [layer[10],layer[11],layer[12], layer[13],layer[14]],
      [,,,layer[15],layer[16]],
    ];

    const rightrows = [
      [layer[20],layer[21],layer[22], layer[23],layer[24]],
      [layer[25],layer[26],layer[27], layer[28],layer[29]],
      [layer[30],layer[31],layer[32], layer[33],layer[34]],
      [layer[35],layer[36]],
    ];
    
    return (
      <>
        <h2>{props.title}</h2>
        <div className="flex">
          <LeftSplit rows={leftrows}/>
          <RightSplit rows={rightrows}/>
        </div>  
      </>
    )
  }

        

  return (
    <>
      <div>
        <h1>Ferris Sweep keymap drawer</h1>
        <p>Choose the file exported from the VIA app</p>
        <input type="file" onChange={handleFileInput} accept='application/json'/>
        <label htmlFor="lstKeycaps">Keycaps: </label>
        <select id="lstKeycaps" value={selectedKeyCap} onChange={(e) => setSelectedKeyCap(e.target.value)}>
          <option value="Flat">Flat</option>
          <option value="3D">3D</option>
        </select>
        { fileChosen && 
          <>
        <Layer layer={json.layers[0]} title="Layer 0"/>
        <Layer layer={json.layers[1]} title="Layer 1"/>
        <Layer layer={json.layers[2]} title="Layer 2"/>
        <Layer layer={json.layers[3]} title="Layer 3"/>
          </>
        }
      </div>
    </>
  );
}

export default App
