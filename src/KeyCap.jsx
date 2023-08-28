const KeyCap = (props) => {
    let { keymap } = props;
    keymap = keymap || { tap: ''}; 
    const fill = keymap.hold ? 'blue' : 'gray';
    const yaxis = keymap.shift ? '75%' : '50%';
 
  return(
    <svg width="100px" height="100px" viewBox="0 0 64 64" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
      <title>{props.tooltip}</title>
      <path d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z" fill="#d0d0d0"></path>
      <path d="M57 45.7c0 4.6-3.7 8.3-8.3 8.3H15.3C10.7 54 7 50.3 7 45.7V12.3C7 7.7 10.7 4 15.3 4h33.3c4.6 0 8.3 3.7 8.3 8.3v33.4z" fill="#ffffff"></path>
        { keymap.shift &&
        <text x="50%" y="25%" dominant-baseline="middle" text-anchor="middle">{keymap.shift }</text>    
        }
        <text x="50%" y={yaxis} dominant-baseline="middle" text-anchor="middle">{keymap.tap }</text>    
        { keymap.hold &&
          <text fontSize="9px" x="35%" y="80%" dominant-baseline="bottom" text-anchor="bottom">{keymap.hold}</text>    
        }

    </svg>
  )
}

export default KeyCap;
