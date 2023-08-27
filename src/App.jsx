import { useState } from 'react';
import './App.css';
import json from '../ferris_sweep.layout.json';

function App() {
  const rows = json.layers.map(l => {
    return (
      <tr>
        {
          l.map(k => {
            return(
              <td>{k}</td>
            );
          })
        }
      </tr>
    );
  });

  function removePrefix(prefix, str) {
    return str.replace(prefix,'');
  }

  function displayKey(label) {
    let temp;
    
    if(label.startsWith('KC_')) {
      temp = label.replace('KC_', '');
      if(temp == 'COMM') {
        return ',';
      }

      if(temp == 'DOT') {
        return '.';
      }

      if(temp == 'SCLN') {
        return ';';
      }

      if(temp.startsWith('P')) {
        return temp.replace('P','');
      }

      if(temp == 'TRNS') {
        return '∇';
      }

      if(temp == 'RGHT') {
        return '→';
      }

      
      if(temp == 'LEFT') {
        return '←';
      }
      if(temp == 'UP') {
        return '↑';
      }
      if(temp == 'DOWN') {
        return '↓';
      }
      return temp;
    }

    if(label.startsWith('S(')) {
      const numberSymbols = {
        'KC_1' : '!',
        'KC_2' : '@',
        'KC_3' : '#',
        'KC_4' : '$',
        'KC_5' : '%',
        'KC_6' : '^',
        'KC_7' : '&',
        'KC_8' : '*',
        'KC_9' : '(',
        'KC_0' : ')',
      }

      const regex = new RegExp('S\\((\\w+)\\)', 'gm')

      let m = regex.exec(label)

        return numberSymbols[m[1]]

   }

      if(label.startsWith('MACRO(')) {
        const regex = /MACRO\((\w+)\)/
        let m = regex.exec(label);
        return `M${m[1]}`;
      }

    if(label.startsWith('MT(')) {
      const regex = /MT\((\w+),(\w+)\)/gm;
      let m;
      while((m = regex.exec(label)) !== null) {
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      console.log(m);
        let top = removePrefix('KC_', m[2]);
        let bottom = removePrefix('MOD_', m[1]);
      return `${top}\n${bottom}`;
    }
    }
    return label;

  }

  const SvgBlock = (props) => {
    return (
      <svg width="50" height="50">
        <rect x="0" y="0" width="50" height="50" stroke="black" opacity="0.3" stroke-width="1px"
              fill="gray" rx="5" ry="5"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{props.tap}</text>    
</svg>
    );
  }

const Cols = (cols) => {
      return cols.map(c => {
        // return (<td>{displayKey(c)}</td>)
        return (<td><SvgBlock tap={displayKey(c)} /></td>)
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
        <h1>Ferris keymap drawer</h1>
        <SvgBlock tap="A"/>
        <Layer layer={json.layers[0]} title="Layer 0"/>
        <Layer layer={json.layers[1]} title="Layer 1"/>
        <Layer layer={json.layers[2]} title="Layer 2"/>
        <Layer layer={json.layers[3]} title="Layer 3"/>
      </div>
    </>
  );
}

export default App
