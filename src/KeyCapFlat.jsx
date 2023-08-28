const KeyCapFlat = (props) => {
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

export default KeyCapFlat;
