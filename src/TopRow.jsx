import KeyCapFlat from './KeyCapFlat';

const TopRow = (props) => {
  return (
    <>
    <KeyCapFlat offsety="50px" keymap={{tap: 'A'}} tooltip="KC_A" /> 
    <KeyCapFlat  offsety="40px" keymap={{tap: 'A'}} tooltip="KC_A" /> 
    <KeyCapFlat  offsety="30px" keymap={{tap: 'A'}} tooltip="KC_A" /> 
    <KeyCapFlat  offsety="40px" keymap={{tap: 'A'}} tooltip="KC_A" /> 
    <KeyCapFlat  offsety="30px" keymap={{tap: 'A'}} tooltip="KC_A" /> 
    </>
  )
}

export default TopRow;
