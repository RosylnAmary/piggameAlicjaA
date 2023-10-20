'use strict';

// Selecting Elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnAbout = document.querySelector(`.btn-about`);
const about = document.querySelector(`.about-popup`);
const main = document.querySelector(`.body`);
const btnClose = document.querySelector(`.btn-close`);

// Starting conditions

let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // genereting a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // Check for rolled 1: if true,
    if (dice !== 1) {
      // ADD Dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // Add current store to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      // Switch
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);

btnAbout.addEventListener(`click`, function () {
  about.classList.toggle(`hidden`);
});

btnClose.addEventListener(`click`, function () {
  about.classList.add(`hidden`);
});
