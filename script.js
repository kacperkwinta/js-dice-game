'use strict';

// selecting elements

// players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('.score--0');
const score1El = document.querySelector('.score--1');
const current0El = document.querySelector('.current--0');
const current1El = document.querySelector('.current--1');

// buttons, dice
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//  modal
const btnRules = document.querySelector('.btn--rules');
const closeModal = document.querySelector('.close-modal');
const modalEl = document.querySelector('.modal-rules');
const overlayEl = document.querySelector('.overlay');

// starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

// switch player
const switchPlayer = function () {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.webp`;
    // show dice in title as favicon
    document.querySelector("link[rel*='icon']").href = `dice-${dice}.webp`;

    // check for rolled 1
    if (dice === 1) {
      // switch player
      switchPlayer();
    } else {
      // keep playing
      currentScore += dice;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;

    // check for win
    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    // switch player
    switchPlayer();
  }
});

// new game
btnNew.addEventListener('click', function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.querySelector('.score--0').textContent = 0;
  document.querySelector('.score--1').textContent = 0;
  document.querySelector('.current--0').textContent = 0;
  document.querySelector('.current--1').textContent = 0;
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
});

/////////////////////////
// modal
/////////////////////////
btnRules.addEventListener('click', function () {
  modalEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
});

closeModal.addEventListener('click', function () {
  modalEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
});

overlayEl.addEventListener('click', function () {
  modalEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
});
