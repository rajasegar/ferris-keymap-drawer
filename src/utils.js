export function removePrefix(prefix, str) {
  return str.replace(prefix, '');
}

export function displayKey(label) {
  let temp = '';

  if (label.startsWith('KC_')) {
    temp = label.replace('KC_', '');
    if (temp == 'COMM') {
      return { tap: ',' };
    }

    if (temp == 'DOT') {
      return { tap: '.' };
    }

    if (temp == 'SCLN') {
      return { tap: ';' };
    }

    if (temp == 'QUOT') {
      return { tap: '\'', shift: '"' };
    }

    if (temp == 'MINS') {
      return { tap: '-', shift: '_' };
    }

    if (temp == 'EQL') {
      return { tap: '=', shift: '+' };
    }

    if (temp == 'LBRC') {
      return { tap: '[', shift: '{' };
    }
    
    if (temp == 'RBRC') {
      return { tap: ']', shift: '}' };
    }
   
    if (temp == 'GRV') {
      return { tap: '`', shift: '~' };
    }

    if (temp == 'BSLS') {
      return { tap: '\\', shift: '|' };
    }

    if (temp.startsWith('P') && temp.length > 1) {
      return { tap: temp.replace('P', '') };
    }

    if (temp == 'TRNS') {
      return { tap: '∇' };
    }

    if (temp == 'RGHT') {
      return { tap: '→' };
    }

    if (temp == 'LEFT') {
      return { tap: '←' };
    }
    if (temp == 'UP') {
      return { tap: '↑' };
    }
    if (temp == 'DOWN') {
      return { tap: '↓' };
    }
    return { tap: temp };
  }

  if (label.startsWith('S(')) {
    const numberSymbols = {
      'KC_1': '!',
      'KC_2': '@',
      'KC_3': '#',
      'KC_4': '$',
      'KC_5': '%',
      'KC_6': '^',
      'KC_7': '&',
      'KC_8': '*',
      'KC_9': '(',
      'KC_0': ')',
    };

    const regex = new RegExp('S\\((\\w+)\\)', 'gm')

    let m = regex.exec(label);

    return { tap: numberSymbols[m[1]] };

  }

  if (label.startsWith('MACRO(')) {
    const regex = /MACRO\((\w+)\)/
    let m = regex.exec(label);
    return { tap: `M${m[1]}` };
  }

  if (label.startsWith('MT(')) {
    const regex = /MT\((\w+),(\w+)\)/gm;
    let m;
    while ((m = regex.exec(label)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      console.log(m);
      let top = removePrefix('KC_', m[2]);
      let bottom = removePrefix('MOD_', m[1]);
      return { tap: top, hold: bottom };
    }
  }

  if (label.startsWith('LT(')) {
    const regex = /LT\((\w+),(\w+)\)/gm;
    let m;
    while ((m = regex.exec(label)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      console.log(m);
      let top = removePrefix('KC_', m[2]);
      return { tap: top, hold: `L${m[1]}` };
    }
  }

  return { tap: label };

}
