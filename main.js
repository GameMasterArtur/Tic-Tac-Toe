document.addEventListener('DOMContentLoaded', function () {
  // Start-Knopf klickbar
  document.querySelector('#start').addEventListener('click', function () { 
    const startButton = document.getElementById('start');
startButton.classList.add('jump');
setTimeout(() => startButton.classList.remove('jump'), 400);// vielleicht weg machen 

    document.querySelector('#spielfeld').style.display = 'block';
    document.querySelector('#start').style.display = 'none';
  });

  const gameboard = document.querySelector('#gameboard');
  const message = document.querySelector('#message');
  let current = 0;
  const players = ['x', 'o'];
  let finished = false; 

  let timer;
let timeLeft = 10;


  // Spielzug
  gameboard.addEventListener('click', function (e) {
    if (finished) return;

    const field = e.target;
    if (field.tagName !== 'BUTTON' || field.disabled) return;

    field.setAttribute('aria-label', players[current]);
field.disabled = true;
field.style.backgroundColor = getRandomColor(); // 👈 NEU!


    const winner = checkWinner();
    if (winner) {
      message.textContent = `Spieler ${winner.toUpperCase()} hat gewonnen! ${getSiegerSpruch()}`;
      finished = true;
    } else if (isFull()) {
      message.textContent = 'Unentschieden!';
      finished = true;
    } else {
      current = 1 - current;
    }
  });

  // Neustart-Knopf klickbar
  document.querySelector('#start').addEventListener('click', function () {  

    const fields = document.querySelectorAll('#gameboard button');
    fields.forEach((f) => {
      f.disabled = false;
      f.removeAttribute('aria-label');
      f.textContent = ''; // Oder '' wenn du kein A1/B1 willst
      f.style.backgroundColor = '';

    });

    message.textContent = '';
    current = 0;
    finished = false; 
 });

  // Gewinner prüfen
  function checkWinner() {
    const fields = document.querySelectorAll('#gameboard button');
    const get = (i) => fields[i].getAttribute('aria-label');

    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of wins) {
      if (get(a) && get(a) === get(b) && get(b) === get(c)) {
        return get(a);
      }
    }

    return null;
  }

  // Unentschieden prüfen
  function isFull() {
    const fields = document.querySelectorAll('#gameboard button');
    return Array.from(fields).every((f) => f.disabled);
  }
});
function getRandomColor() {
  const farben = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFFFE0', '#FFA07A', '#DDA0DD', '#E0FFFF'];
  return farben[Math.floor(Math.random() * farben.length)];
}

function getSiegerSpruch() {
  const sprueche = [
    "🏆 Was für ein epischer Sieg!",
    "🎉 Unglaublich gespielt!",
    "💥 Boom! Das war's.",
    "😎 Meisterhaft!",
    "🔥 Das war vernichtend!"
  ];
  return sprueche[Math.floor(Math.random() * sprueche.length)];
}


