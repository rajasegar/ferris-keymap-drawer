import { useState } from 'react';
import './App.css';
import json from '../ferris_sweep.layout.json';
import { displayKey } from './utils.js';

function App() {

  

  const SvgBlock = (props) => {
    let { keymap } = props;
    keymap = keymap || { tap: ''}; 
    const fill = keymap.hold ? 'blue' : 'gray';
    const yaxis = keymap.shift ? '75%' : '50%';
    
    
    return (
      <svg width="50" height="50">
        <rect x="0" y="0" width="50" height="50" stroke="black" opacity="0.3" stroke-width="1px"
              fill={fill} rx="5" ry="5"/>
        { keymap.shift &&
        <text x="50%" y="25%" dominant-baseline="middle" text-anchor="middle">{keymap.shift }</text>    
        }
        <text x="50%" y={yaxis} dominant-baseline="middle" text-anchor="middle">{keymap.tap }</text>    
        { keymap.hold &&
          <text font-size="10px" x="25%" y="90%" dominant-baseline="bottom" text-anchor="bottom">{keymap.hold}</text>    
        }
</svg>
    );
  }

const Cols = (cols) => {
      return cols.map(c => {
        return <td><SvgBlock keymap={displayKey(c)} /></td>
      })
    }

    const Rows = (rows) => {
      return rows.map(r => {
       return (
          <tr>{Cols(r)}</tr>
        )
      })
    }

  const LeftSplit = (props) => {
    return (
      <>
        <table>
          {Rows(props.rows)}
        </table>
      </>
    )
  }

const RightSplit = (props) => {
    return (
      <>
        <table>
          {Rows(props.rows)}
        </table>
      </>
    )
  }

  const Layer = (props) => {
    const layer = props.layer;

    const leftrows = [
      [layer[0],layer[1],layer[2], layer[3],layer[4]],
      [layer[5],layer[6],layer[7], layer[8],layer[9]],
      [layer[10],layer[11],layer[12], layer[13],layer[14]],
      [' ', ' ', ' ',layer[15],layer[16]],
    ];

    const rightrows = [
      [layer[20],layer[21],layer[22], layer[23],layer[24]],
      [layer[25],layer[26],layer[27], layer[28],layer[29]],
      [layer[30],layer[31],layer[32], layer[33],layer[34]],
      [layer[35],layer[36],' ',' ',' '],
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
        <Layer layer={json.layers[0]} title="Layer 0"/>
        <Layer layer={json.layers[1]} title="Layer 1"/>
        <Layer layer={json.layers[2]} title="Layer 2"/>
        <Layer layer={json.layers[3]} title="Layer 3"/>
      </div>
    </>
  );
}

export default App
