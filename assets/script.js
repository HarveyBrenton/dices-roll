// Variables globales
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let gamePlaying = true;

let dotPlayer1 = document.querySelector('.dot-0');
let dotPlayer2 = document.querySelector('.dot-1');

// Initialisation du jeu
init();

// Fonction d'initialisation du jeu
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.global-score-0').textContent = '0';
  document.querySelector('.global-score-1').textContent = '0';
  document.querySelector('.current-round-score-0').textContent = '0';
  document.querySelector('.current-round-score-1').textContent = '0';
  document.querySelector('.player-0').classList.remove('victoire');
  document.querySelector('.player-1').classList.remove('victoire');
  document.querySelector('.player-0').classList.add('active');
  document.querySelector('.player-1').classList.remove('active');
  dotPlayer1.classList.add('active');
  dotPlayer2.classList.remove('active');
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
}


// Gestionnaire d'événement pour le bouton "Roll Dice"
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let diceDOM = document.querySelector('.dice');
    diceDOM.src = 'assets/images/dice-' + dice + '.png';
    diceDOM.alt = 'Dice' + dice;

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('.current-round-score-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Gestionnaire d'événement pour le bouton "Hold"
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('.global-score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector('.player-' + activePlayer).classList.add('victoire');
      document.querySelector('.player-' + activePlayer).classList.remove('active');
      document.querySelector('.btn-roll').disabled = true;
      document.querySelector('.btn-hold').disabled = true;
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// Fonction pour passer au joueur suivant
function nextPlayer() {
  roundScore = 0;
  document.querySelector('.current-round-score-0').textContent = '0';
  document.querySelector('.current-round-score-1').textContent = '0';
  document.querySelector('.player-0').classList.toggle('active');
  document.querySelector('.player-1').classList.toggle('active');
  activePlayer = (activePlayer === 0) ? 1 : 0;
  dotPlayer1.classList.toggle('active');
  dotPlayer2.classList.toggle('active');


  document.querySelector('.player-' + activePlayer).classList.remove('active');
}

// Gestionnaire d'événement pour le bouton "New Game"
document.querySelector('.btn-new').addEventListener('click', init);
