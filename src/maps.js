const emojis = {
  '-': ' ',
  'O': '🌴',
  'X': '💣',
  'I': '🍌',
  'PLAYER': '🐵',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '💚'
};


const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX-------X
  X--XX-XX-X
  X-XXX--X--
  X-XXXX-XX-
  XX--XX--XX
  XX--XXX-XX
  XXXX-----X
  XXXXXXXX-I
  `);

maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX---X---X
  XXXX---X-O
`);
maps.push(`
  OXXXXXXXXX
  ---XXXXXXX
  XX--XXXXXX
  I-X--XXXXX
  X--X--XXXX
  XX--X--XXX
  XXX--X--XX
  XXXX--X--X
  XXXXX--X-X
  XXXXXX---X
  XXXXXXXXXX
`);
maps.push(`
  I--XX---XX
  XX----X--X
  XXXXXXXX--
  O---XXXXX-
  XXX-XXXX--
  ----XX---X
  -X-X--X-XX
  -X---XX-XX
  -XXXXXX-XX
  ---------X
`);
maps.push(`
  O---------
  XXXXXXXXX-
  --------X-
  -XXXXXX-X-
  -X----X-X-
  -X-XXIX-X-
  -X-XXXX-X-
  -X------X-
  -XXXXXXXX-
  ----------
`);
maps.push(`
  I---------
  XXXXXX-XX-
  --------X-
  -XXXXXX-X-
  -X----X-X-
  -X-XXOX-X-
  -X-XXXX-X-
  -X------X-
  -XXXXXXXX-
  ----------
`);
maps.push(`
  O---------
  XXXXXXXXX-
  I---X---X-
  -X--X---X-
  -X--X---X-
  -X--X---X-
  -X--X---X-
  --------X-
  -XX-X-X-X-
  --X---X---
`);
