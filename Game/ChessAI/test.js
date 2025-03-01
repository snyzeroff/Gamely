// script.js

function onClickTile(row, col) {
    // A) Votre code visuel existant
    highlightTile(row, col);
    // ... d’autres animations, etc.
  
    // B) Appelez la logique du moteur
    if (typeof window.handleClickChess === 'function') {
      window.handleClickChess(row, col);
    }
  }